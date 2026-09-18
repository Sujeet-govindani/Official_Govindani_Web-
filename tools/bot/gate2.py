#!/usr/bin/env python3
"""Candidate gate. Iterated here because Python is free and PHP is not testable
on this machine; ported to chat.php once the numbers are right.

Three outcomes, not two:
  ALLOW   — reaches the model
  GREET   — answered locally with a warm canned line, no API call
  BLOCK   — refused locally, counts a strike, no API call
"""
import re, unicodedata

# Word-boundary matched, so "class" never trips "ass" and "Assam" is safe.
PROFANITY = [
    r"bhosdi?ke?", r"bhosda", r"madar\s*chod", r"mader\s*chod", r"behen\s*chod",
    r"bhen\s*chod", r"ma?dr?chd", r"gandu?", r"gaand", r"chut(iya|iye|ad)",
    r"rand[iy]", r"harami", r"kutt[ae]", r"kamin[ae]", r"saal[ae]", r"lodu?",
    r"lund", r"bakchod", r"jhaat", r"tatti", r"chinal", r"bsdk", r"mc\b", r"bc\b",
    r"fuck\w*", r"f\*+ck", r"shit", r"bitch", r"asshole", r"bastard", r"dick",
    r"cunt", r"slut", r"whore", r"rape", r"porn", r"sex\s*chat", r"nude",
]
GREETING = {
    "hi","hii","hiii","hiiii","hlo","helo","hello","hey","heyy","yo","sup",
    "namaste","namaskar","namste","ram ram","jai shree ram","salaam","adab",
    "good morning","good afternoon","good evening","gm","gn","gud morning",
    "kya haal","kya haal hai","kaise ho","kaise hain","kaisa hai","how are you",
    "ok","okay","oky","k","kk","hmm","hmmm","hm","acha","achha","theek hai",
    "thik hai","haan","haa","ji","yes","no","nope","thanks","thank you","thx",
    "shukriya","dhanyavaad","bye","ok bye","ttyl","good night","welcome",
}
OFFTOPIC = [
    r"\b(ipl|world cup|kohli|dhoni|rohit sharma)\b",
    r"\b(cricket|football|hockey)\b", r"\bmatch (score|result|kaun jeeta)\b",
    r"\b(live score|match score)\b",
    r"\b(modi|rahul gandhi|election|bjp|congress|aap party|politics)\b",
    r"\b(weather|barish|mausam|temperature|forecast)\b",
    r"\b(horoscope|kundli|rashifal|astrolog|numerolog\w*\s*for\s*me|future batao)\b",
    r"\b(movie|film|bollywood|netflix|web series|song|gaana|shayari|joke|pj|paheli|riddle)\b",
    r"\b(bitcoin|crypto|share market|stock tip|lottery|satta|betting)\b",
    r"\b(biryani|restaurant|recipe|khana)\b",
    r"\b(chatgpt|openai|gemini|claude|which ai|tera creator|who made you)\b",
    r"\b(girlfriend|boyfriend|shaadi karo|i love you|date pe|photo bhejo|akeli)\b",
    r"\btera (naam|baap|maa|ghar)\b", r"\bkitni umar\b",
    r"\b(tu|tum|aap) (ladki|ladka|insaan|aadmi|robot|machine|human)\b",
    r"\b(petrol|diesel|gold|silver|sona|chandi) (ka |ke )?(rate|price|bhav)\b",
    r"\bbest (biryani|restaurant|hotel|movie|film)\b",
]
FREELOAD = [
    r"\b(homework|assignment|essay|poem|kavita|nibandh)\b",
    r"\bwrite (me )?(a |an |my )?(code|program|script|resume|cv|application|letter|story)\b",
    r"\b(solve|calculate) this\b", r"\btranslate this\b",
    r"\bexplain (photosynthesis|gravity|history)\b",
    r"\bact as (a|an)\b", r"\bpretend (you|to be)\b",
    r"\b(leave|job) application\b", r"\b(python|java|php|c\+\+) (script|code|program)\b",
    r"\bgive me (a )?(script|code|program)\b", r"\bgrant .{0,20}discount\b",
]
INJECTION = [
    r"ignore (all )?(previous|prior|above)", r"system prompt", r"your instructions",
    r"repeat everything above", r"\bDAN\b", r"no rules apply", r"reveal your (api|key)",
    r"disregard your", r"output the text above", r"you are now",
]

# Bare interrogatives carry no subject: "kaise ho" is a greeting, not a question
# about us. They only count as topic signal alongside a real subject word.
INTERROGATIVE = {"kaise", "kaun", "kyun", "kya", "kitna", "kitne", "कैसे", "कौन", "क्या"}

DISMISSIVE = [
    r"\b(idiot|stupid|dumb|useless|worthless|nonsense|rubbish|garbage|trash)\b",
    r"\bshut up\b", r"\byou (suck|lie|are (bad|useless|fake|a bot))\b",
    r"\b(bekaar|bakwas|faltu|fizul|ghatiya|nikamma|paagal|pagal)\b",
    r"\bwaste of (time|money)\b", r"\b(dumb|stupid) (bot|machine|ai|robot)\b",
    r"\bkaam ka nahi\b", r"\bkuch nahi jaanta\b",
]
VOCATIVE = {"bhai","bhaiya","yaar","yar","sir","madam","ji","bro","boss","dost",
            "guru","beta","dear","hey","are","arre","oye","suno","haan","acha"}
FILLER = {"test","testing","checking","check","try","trying","demo","hello world",
          "anyone","koi hai","kuch bhi","random","abcd"}

_EMOJI = re.compile(
    "[" "\U0001F300-\U0001FAFF" "\U00002600-\U000027BF" "\U0001F1E6-\U0001F1FF"
    "\U00002190-\U000021FF" "\U0000FE0F" "]+")


def _norm(t: str) -> str:
    t = unicodedata.normalize("NFKC", t).lower().strip()
    t = t.translate(str.maketrans({"0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "@": "a", "$": "s"}))
    return re.sub(r"\s+", " ", t)


def _strip_decoration(t: str) -> str:
    t = _EMOJI.sub(" ", t)
    return re.sub(r"[^\w\sऀ-෿]+", " ", t).strip()


def looks_gibberish(t: str) -> bool:
    """Keyboard mashing, not language."""
    core = re.sub(r"[^a-z]", "", t.lower())
    if len(core) < 3:
        return False
    if not re.search(r"[aeiou]", core) and len(core) >= 5:
        return True                                   # sdfsdfsdf, zxcvbnm
    for tok in re.findall(r"[a-z]+", t.lower()):
        if re.search(r"(.)\1{3,}", tok):
            return True                               # aaaaaa, but not "www wala"
    for run in ("qwerty", "asdf", "zxcv", "qwer", "asdasd", "hjkhjk", "abcd", "1234"):
        if run in core:
            return True
    if len(set(core)) <= 2 and len(core) >= 4:
        return True
    return False


def classify(text: str, is_follow_up: bool, topic_words: list[str]) -> str:
    raw = text.strip()
    if raw == "":
        return "BLOCK"
    t = _norm(raw)
    bare = _strip_decoration(t)

    # emoji or punctuation only
    if bare == "":
        return "GREET"

    # Abuse and injection are refused whatever else the message contains.
    for pat in PROFANITY:
        if re.search(rf"\b{pat}\b", t):
            return "BLOCK"
    for pat in INJECTION:
        if re.search(pat, t):
            return "BLOCK"

    # Topic FIRST, before the length and gibberish tests. Getting this order
    # wrong blocked 14 real questions: a long Hinglish question about WhatsApp
    # campaigns tripped the 200-character wall before anything noticed it was
    # about WhatsApp.
    for group in (DISMISSIVE, FREELOAD, OFFTOPIC):
        for pat in group:
            if re.search(pat, t):
                return "BLOCK"

    subject = [w for w in topic_words if w in t and w not in INTERROGATIVE]
    if subject:
        return "ALLOW"

    # Strip vocatives and collapse stammered repeats so "bhai hi hi yaar"
    # reduces to the greeting it is.
    words = [w for w in bare.split() if w not in VOCATIVE]
    dedup = [w for i, w in enumerate(words) if i == 0 or w != words[i - 1]]
    core = " ".join(dedup)
    flat = {g.replace(" ", "") for g in GREETING}
    if (core in GREETING or core.replace(" ", "") in flat or core in FILLER
            or (len(set(dedup)) == 1 and dedup and dedup[0] in GREETING)):
        return "GREET"

    if looks_gibberish(core or bare):
        return "BLOCK"

    if is_follow_up:
        return "ALLOW"       # mid-conversation, they have earned the benefit of doubt

    # An opener with no subject we recognise. Answering it locally with a warm
    # "what do you need?" costs nothing and reads better than either a refusal
    # or a model call that can only ask the same question.
    if len(bare) > 200:
        return "BLOCK"
    if "?" in raw and len(dedup) >= 4:
        return "ALLOW"
    if len(dedup) >= 6:
        return "ALLOW"
    return "GREET"
