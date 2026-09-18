// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useScrolledPastHero } from "../../hooks/useScrolledPastHero";
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const colors = {
    metallicGold: '#C5A028',
    lightMetallicGold: '#E6C35C',
    accentBlue: '#1e3a5f',
    white: '#ffffff',
    cream: '#F5F5DC',
};
const ngo = {
    dark: '#3D2B1F',
    mid: '#6B4226',
    cardBg: 'rgba(245,232,195,0.92)',
    cardBorder: '1.5px solid rgba(160,120,60,0.55)',
    peopleBg: 'rgba(240,225,180,0.88)',
    peopleBorder: '1.5px solid rgba(160,120,60,0.45)',
};
const ec = {
    cream: '#EAD9B5',
    creamDim: '#C9B28A',
    gold: '#E6C35C',
    boxBg: 'rgba(38,18,5,0.91)',
    boxBorder: 'rgba(197,160,40,0.52)',
};

const portfolioBtnStyle = (mob, tab) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(245,230,175,0.92)',
    border: '1.5px solid rgba(160,120,60,0.6)',
    borderRadius: '30px',
    padding: mob ? '0.52rem 1.8rem' : tab ? '0.58rem 1.9rem' : '0.66rem 2.3rem',
    color: '#3D2B1F',
    fontFamily: "'Libre Baskerville',serif",
    fontWeight: 700,
    fontSize: mob ? '0.82rem' : tab ? '0.86rem' : '0.92rem',
    cursor: 'pointer',
    letterSpacing: '0.3px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'transform 0.2s',
    animation: 'ngo_pulse 3s ease-in-out infinite',
    flexShrink: 0,
});

const SLIDES = [
    { titleLine1: 'Turning Influence Into', titleLine2: 'Real-World Impact.', quote: "True influence is measured by the impact it creates beyond the screen.", founderName: 'HARSH CHHIKARA', founderTitle: 'HARSH CHHIKARA FOUNDATION', imageUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/HCmain.webp', gifUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GIF1.webp', boxDescription: "Crafted a digital platform for Harsh Chhikara that reflects their vision, credibility, and growing brand presence.", buttons: [{ text: 'Portfolio', link: '/portfolio/babaji' }, { text: 'Book Demo', link: '/demo/babaji' }, { text: 'Contact', link: '/contact/babaji' }], socialCounts: { instagram: '1.1M+ Followers', youtube: '743K', facebook: '2.5M+' }, backgroundImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/HCimg.webp' },
    { titleLine1: 'Building Visions', titleLine2: 'Into Living Spaces.', quote: "The future belongs to those embracing digital transformation.", founderName: 'VARUN MALIK', founderTitle: 'CI BUILDERS', imageUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VM.webp', gifUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GIF1.webp', boxDescription: "Developed CI Builders website to showcase Varun Malik's real estate expertise with strong digital presence.", buttons: [{ text: 'Projects', link: '/portfolio/cibuilders' }, { text: 'Get Quote', link: '/quote/cibuilders' }, { text: 'Sales', link: '/contact/cibuilders' }], socialCounts: { instagram: '1.1M+ Followers', youtube: '743K', facebook: '2.5M+' }, backgroundImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VMimg.webp' },
    { titleLine1: 'Hope, Dignity & Dreams', titleLine2: 'for Every Life.', quote: "A future built on care, dignity, and lasting support.", founderName: 'MAHIPATSINH CHAUHAN', founderTitle: 'Mahipatsinh Foundation', imageUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MSmain.webp', gifUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GIF1.webp', boxDescription: "Built Mahipatsinh Foundation's website to showcase their work in empowering vulnerable individuals.", buttons: [{ text: 'About Us', link: '/about/mahipatsinh' }, { text: 'Donate', link: '/donate/mahipatsinh' }, { text: 'Volunteer', link: '/volunteer/mahipatsinh' }], socialCounts: { instagram: '1.1M+ Followers', youtube: '343K', facebook: '20 Lakh+' }, backgroundImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/MSimg.webp' },
    { titleLine1: 'Giving Every Voice', titleLine2: 'a Second Chance.', quote: "Compassion isn't selective it's for all beings.", founderName: 'GANESH NAYAK', founderTitle: 'Animals Matter To Me', imageUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GNmain.webp', gifUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GIF1.webp', boxDescription: "Designed Animals Matter To Me website to bring visibility to Ganesh Nayak's animal welfare mission.", buttons: [{ text: 'Support', link: '/support/amtm' }, { text: 'Adopt', link: '/adopt/amtm' }, { text: 'Help Out', link: '/volunteer/amtm' }], socialCounts: { instagram: '99.3K Followers', youtube: '22.8K', facebook: '244K' }, backgroundImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/AMTMimg.webp' },
    { titleLine1: 'Compassion in Action:', titleLine2: 'Sanctuary for Every Life.', quote: "When care is driven by compassion, every action creates change.", founderName: 'DEVI CHHITRALEKHA', founderTitle: 'GAUSEVADHAM TRUST', imageUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/DCmain1.webp', gifUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GIF1.webp', boxDescription: "Developed Gau Seva Dham to amplify Devi Chitralekha's mission of protecting animals with compassion.", buttons: [{ text: 'Visit', link: '/visit/gauseva' }, { text: 'Donate', link: '/donate/gauseva' }, { text: 'Partner', link: '/partner/gauseva' }], socialCounts: { instagram: '6.5M+ Followers', youtube: '4.58M', facebook: '5.1K+' }, backgroundImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/DCimg.webp' },
    { titleLine1: 'Lifting Lives with', titleLine2: 'Dignity and Care.', quote: "Compassion isn't a gesture it's a lasting embrace.", founderName: 'POPATBHAI', founderTitle: 'Popatbhai Charitable Foundation', imageUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PBmain.webp', gifUrl: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/GIF1.webp', boxDescription: "Created Popatbhai Charitable Foundation website reflecting dedication to uplifting underprivileged communities.", buttons: [{ text: 'Impact', link: '/impact/popatbhai' }, { text: 'Contribute', link: '/contribute/popatbhai' }, { text: 'Join', link: '/join/popatbhai' }], socialCounts: { instagram: '1.8M+ Followers', youtube: '2.41M', facebook: '1.9M+' }, backgroundImage: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PBimg.webp' },
];

const TOTAL_SLIDES = 4;
const SLIDE_ORDER = [0, 1, 6, 3];
const SLIDE_TO_FOUNDER = { 10: 0, 11: 1, 12: 2, 13: 3, 14: 4, 15: 5 };

const SERVICES = [
    { name: 'Custom CRM', route: '/crm' },
    { name: 'E-Commerce', route: '/services/ecommerce' },
    { name: 'Healthcare', route: '/hospital' },
    { name: 'Real Estate', route: '/real-estate' },
    { name: 'NGO', route: '/pages/NgoPage' },
];
const SLIDE_SERVICE_INDEX = { 10: 4, 11: 3, 12: 4, 13: 4, 14: 4, 15: 4 };
const SOCIAL_LINKS = [
    'https://instagram.com/govindaniinfotech',
    'https://youtube.com/c/govindaniinfotech',
    'https://facebook.com/govindaniinfotech',
];

const BRAND_CONFIG = [
    {
        name: 'Mukta',
        laptopImages: ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide2.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide2.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide2.webp'],
        mobileImages: ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide2.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide2.webp'],
    },
    {
        name: 'Khambani',
        laptopImages: ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide1.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide1.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide1.webp'],
        mobileImages: ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide1.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide1.webp'],
    },
    {
        name: 'Terra',
        laptopImages: ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Tarushlaptop.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Tarushlaptop.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Tarushlaptop.webp'],
        mobileImages: ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Tarushlaptop.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Tarushlaptop.webp'],
    },
    {
        name: 'Baba Ji',
        laptopImages: ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bjkb.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tabe1.png'],
        mobileImages: ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mobbjkb.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tabe2.png'],
    },
];
const ECOM_LAPTOP_ALL = ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tabe1.png', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tabe2.png', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tabe3.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bjkb.webp'];
const ECOM_MOBILE_ALL = ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tabe1.png', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tabe2.png', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tabe3.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mobbjkb.webp'];

const RE_MONITOR_IMAGES = ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/re-1.png', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/re4.webp'];
const RE_MOBILE1_IMAGES = ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/re-2.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/re4.png'];
const RE_MOBILE2_IMAGES = ['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/re-2.webp', 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/re4.png'];

const NAV_H_MOB = 60;
const NAV_H_TAB = 72;
const NAV_H_DESK = 80;

const IgIcon = ({ s }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
    </svg>
);
const YtIcon = ({ s }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="white">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
);
const FbIcon = ({ s }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const RadialNavMenu = ({ mob, isFirstSlide }) => {
    const [open, setOpen] = React.useState(false);
    const show = useScrolledPastHero();

    // Menu items in required sequence — top items appear above the toggle, bottom below
    const topItems = [
        { label: 'Home', id: 'home' },
        { label: 'Services', id: 'services' },
    ];
    const bottomItems = [
        { label: 'Whatsapp', id: 'whatsapp' },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'Ngo', id: 'ngo' },
    ];

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const navOffset = window.innerWidth < 768 ? 64 : window.innerWidth < 1024 ? 72 : 80;
            const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        setOpen(false);
    };

    const ITEM_H = 44;   // height of each item slot
    const BTN_H = 52;   // height of center toggle button
    const GAP = 4;    // gap between items

    // Total height = top items + gap + center btn + gap + bottom items
    const totalH =
        topItems.length * (ITEM_H + GAP) +
        BTN_H +
        GAP +
        bottomItems.length * (ITEM_H + GAP) +
        GAP;

    // Center of the whole stack
    const centerY = totalH / 2;

    // y position of center button
    const centerBtnTop = topItems.length * (ITEM_H + GAP);

    const btnBase = {
        position: 'absolute',
        left: 0,
        width: '80px',
        height: ITEM_H,
        padding: mob ? '0 2px' : '0 4px',
        fontSize: mob ? '9px' : '10px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textAlign: 'center',
        border: mob ? (isFirstSlide ? '1px solid rgba(61,43,31,0.3)' : '1px solid rgba(197,160,40,0.45)') : '1px solid rgba(197,160,40,0.7)',
        borderRadius: '8px 0 0 8px',
        background: mob ? (isFirstSlide ? 'rgba(61,43,31,0.08)' : 'rgba(197, 160, 40, 0.15)') : 'linear-gradient(135deg,#C5A028,#E6C35C)',
        color: mob ? (isFirstSlide ? '#3D2B1F' : '#F0DFA0') : '#3D2B1F',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        backdropFilter: 'blur(8px)',
        boxShadow: mob ? (isFirstSlide ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.2)') : '0 2px 12px rgba(197,160,40,0.35)',
        lineHeight: `${ITEM_H}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: '35%',
            // Slides in from the left once the hero is scrolled past, instead of
            // sitting over the hero content from the first paint.
            transform: show ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-110%)',
            opacity: show ? 1 : 0,
            transition: 'transform 320ms cubic-bezier(.4,0,.2,1), opacity 260ms ease',
            pointerEvents: show ? 'auto' : 'none',
            zIndex: 9999,
        }}>
            <div style={{ position: 'relative', width: '88px', height: totalH }}>

                {/* TOP ITEMS */}
                {topItems.map((item, i) => {
                    const topPos = i * (ITEM_H + GAP);
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            style={{
                                ...btnBase,
                                top: topPos,
                                opacity: open ? 1 : 0,
                                transform: open ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.7)',
                                transitionDelay: open
                                    ? `${i * 50}ms`
                                    : `${(topItems.length - 1 - i) * 30}ms`,
                                pointerEvents: open ? 'auto' : 'none',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = mob ? (isFirstSlide ? 'rgba(61,43,31,0.2)' : 'rgba(197,160,40,0.35)') : 'linear-gradient(135deg,#E6C35C,#F0D060)';
                                e.currentTarget.style.color = mob ? (isFirstSlide ? '#000' : '#fff') : '#1a0a00';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = mob ? (isFirstSlide ? 'rgba(61,43,31,0.08)' : 'rgba(197, 160, 40, 0.15)') : 'linear-gradient(135deg,#C5A028,#E6C35C)';
                                e.currentTarget.style.color = mob ? (isFirstSlide ? '#3D2B1F' : '#F0DFA0') : '#3D2B1F';
                            }}
                        >
                            {item.label}
                        </button>
                    );
                })}

                {/* CENTER TOGGLE */}
                <button
                    onClick={() => setOpen(p => !p)}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: centerBtnTop,
                        width: mob ? '60px' : '80px',
                        height: BTN_H,
                        padding: mob ? '0 2px' : '0 4px',
                        fontSize: mob ? '10px' : '11px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textAlign: 'center',
                        border: mob ? '1px solid rgba(197,160,40,0.6)' : '1px solid rgba(197,160,40,0.8)',
                        borderRadius: '10px 0 0 10px',
                        background: mob
                            ? (isFirstSlide ? 'rgba(61,43,31,0.12)' : 'rgba(197, 160, 40, 0.2)')
                            : (open
                                ? 'linear-gradient(135deg,#C5A028,#E6C35C)'
                                : 'linear-gradient(135deg,#D4AF37,#F0D060)'),
                        color: mob ? (isFirstSlide ? '#3D2B1F' : '#F0DFA0') : '#3D2B1F',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)',
                        boxShadow: mob ? (isFirstSlide ? '0 2px 10px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.25)') : (open
                            ? '0 0 20px rgba(197,160,40,0.5),-4px 0 16px rgba(197,160,40,0.25)'
                            : '0 2px 14px rgba(197,160,40,0.3)'),
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                    }}
                >
                    <svg
                        width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke={mob ? (isFirstSlide ? "#3D2B1F" : "#F0DFA0") : "#3D2B1F"} strokeWidth="2.5" strokeLinecap="round"
                        style={{
                            transition: 'transform 0.3s ease',
                            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                        }}
                    >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                    Menu
                </button>

                {/* BOTTOM ITEMS */}
                {bottomItems.map((item, i) => {
                    const topPos = centerBtnTop + BTN_H + GAP + i * (ITEM_H + GAP);
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            style={{
                                ...btnBase,
                                top: topPos,
                                opacity: open ? 1 : 0,
                                transform: open ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.7)',
                                transitionDelay: open
                                    ? `${i * 50}ms`
                                    : `${(bottomItems.length - 1 - i) * 30}ms`,
                                pointerEvents: open ? 'auto' : 'none',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = mob ? (isFirstSlide ? 'rgba(61,43,31,0.2)' : 'rgba(197,160,40,0.35)') : 'linear-gradient(135deg,#E6C35C,#F0D060)';
                                e.currentTarget.style.color = mob ? (isFirstSlide ? '#000' : '#fff') : '#1a0a00';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = mob ? (isFirstSlide ? 'rgba(61,43,31,0.08)' : 'rgba(197, 160, 40, 0.15)') : 'linear-gradient(135deg,#C5A028,#E6C35C)';
                                e.currentTarget.style.color = mob ? (isFirstSlide ? '#3D2B1F' : '#F0DFA0') : '#3D2B1F';
                            }}
                        >
                            {item.label}
                        </button>
                    );
                })}

            </div>
        </div>
    );
};
const CSSPhoneMockup = ({ screenImages, uid = 'ph', maxWidth = 110, resetKey }) => (
    <>
        <style>{`
            .cssph-${uid}{width:100%;max-width:${maxWidth}px;margin:0 auto;}
            .cssph-${uid} *{box-sizing:border-box!important;}
            .cssph-${uid} .ph-case{
                position:relative;width:100%;height:0;padding-bottom:200%;
                background:linear-gradient(160deg,#222,#111);
                border-radius:14% / 7%;
                box-shadow:inset 3px 3px 8px rgba(255,255,255,0.08),inset 0 0 3px #000,inset -3px -3px 8px 0px rgba(0,0,0,0.6),8px 8px 14px rgba(0,0,0,0.6);
                border:2px solid #000;
            }
            .cssph-${uid} .ph-inner{
                position:absolute;top:3%;left:3%;right:3%;bottom:3%;
                background:#0d0d0d;border-radius:12% / 6%;overflow:hidden;
            }
            .cssph-${uid} .ph-screen{
                position:absolute;top:8%;left:4%;right:4%;bottom:7%;
                overflow:hidden;border-radius:9% / 4.5%;background:#0d1117;
            }
            .cssph-${uid} .ph-notch{
                position:absolute;top:0;left:50%;transform:translateX(-50%);
                width:36%;height:3.5%;background:#000;border-radius:0 0 8px 8px;z-index:5;
            }
            .cssph-${uid} .ph-home{
                position:absolute;bottom:1.5%;left:50%;transform:translateX(-50%);
                width:22%;height:1.2%;background:rgba(255,255,255,0.18);border-radius:4px;z-index:5;
            }
            .cssph-${uid} .ph-case:before{
                content:'';position:absolute;background:#1a1a1a;width:3px;height:12%;
                left:-3px;top:25%;border-top-left-radius:3px;border-bottom-left-radius:3px;
                box-shadow:inset 1px 0 2px rgba(0,0,0,0.8);
            }
            .cssph-${uid} .ph-case:after{
                content:'';position:absolute;background:#1a1a1a;width:3px;height:18%;
                right:-3px;top:30%;border-top-right-radius:3px;border-bottom-right-radius:3px;
                box-shadow:inset -1px 0 2px rgba(0,0,0,0.8);
            }
        `}</style>
        <div className={`cssph-${uid}`}>
            <div className="ph-case">
                <div className="ph-inner">
                    <div className="ph-screen">
                        <div className="ph-notch" />
                        <ScreenCarousel images={screenImages} interval={4000} resetKey={resetKey} />
                        <div className="ph-home" />
                    </div>
                </div>
            </div>
        </div>
    </>
);

const ScreenCarousel = ({ images, interval = 4500, resetKey = 0 }) => {
    const [idx, setIdx] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => { setIdx(0); setFade(true); }, [resetKey]);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const t = setInterval(() => {
            setFade(false);
            setTimeout(() => { setIdx(p => (p + 1) % images.length); setFade(true); }, 350);
        }, interval);
        return () => clearInterval(t);
    }, [images, interval, resetKey]);

    if (!images || images.length === 0) return null;
    return (
        <img
            src={images[idx]}
            alt="screen"
            style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                opacity: fade ? 1 : 0, transition: 'opacity 0.35s ease-in-out'
            }}
            onError={e => { e.target.style.display = 'none'; if (e.target.parentElement) e.target.parentElement.style.background = 'linear-gradient(135deg,#0d1b2a,#1e3a5f)'; }}
        />
    );
};

const CSSLaptop = ({ screenImages, uid = 'lap', maxWidth = 480, resetKey }) => (
    <>
        <style>{`
            .cssl-${uid}{width:100%;max-width:${maxWidth}px;margin:0 auto;}
            .cssl-${uid} *{box-sizing:border-box!important;}
            .cssl-${uid} .l-dp{width:82%;margin:0 auto;}
            .cssl-${uid} .l-dsp{position:relative;width:100%;height:0;padding-bottom:62.9%;background:#1e1e1e;border-top-left-radius:3.5% 5.5%;border-top-right-radius:3.5% 5.5%;box-shadow:0 0 0 1.5px #3a3a3a,0 20px 60px rgba(0,0,0,0.65),0 6px 24px rgba(0,0,0,0.4);}
            .cssl-${uid} .l-dsp:before{content:'';display:block;position:absolute;top:3%;left:50%;width:1%;height:1.6%;margin-left:-0.5%;border-radius:50%;background:#555;}
            .cssl-${uid} .l-spos{position:absolute;top:8.2%;width:93%;left:3.5%;height:0;padding-bottom:53%;}
            .cssl-${uid} .l-sc{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;background:#0d1117;border-radius:3px;}
            .cssl-${uid} .l-bod{position:relative;width:100%;height:0;padding-bottom:2.3%;background:#c5c6c8;}
            .cssl-${uid} .l-bod:before{content:'';display:block;position:absolute;top:0;left:50%;width:14%;height:0;padding-bottom:1.5%;margin-left:-7%;background:#969799;border-bottom-left-radius:7% 50%;border-bottom-right-radius:7% 50%;}
            .cssl-${uid} .l-btm{width:100%;height:0;padding-bottom:0.74%;background:#969799;border-bottom-left-radius:12% 600%;border-bottom-right-radius:12% 600%;}
        `}</style>
        <div className={`cssl-${uid}`}>
            <div className="l-dp">
                <div className="l-dsp">
                    <div className="l-spos">
                        <div className="l-sc">
                            <ScreenCarousel images={screenImages} resetKey={resetKey} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="l-bod" />
            <div className="l-btm" />
        </div>
    </>
);

const CSSMobile = ({ screenImages, uid = 'mob', maxWidth = 100, resetKey }) => (
    <>
        <style>{`
            .cssm-${uid}{width:100%;max-width:${maxWidth}px;margin:0 auto;}
            .cssm-${uid} *{box-sizing:border-box!important;}
            .cssm-${uid} .m-bd{position:relative;width:100%;height:0;padding-bottom:198%;background:linear-gradient(160deg,#2e2e2e,#141414);border-radius:13% / 6.5%;box-shadow:0 10px 40px rgba(0,0,0,0.7),0 0 0 1.5px #3a3a3a;}
            .cssm-${uid} .m-bd:before{content:'';position:absolute;top:0.8%;right:1.6%;bottom:0.8%;left:1.6%;background:#0e0e0e;border-radius:12% / 6%;}
            .cssm-${uid} .m-sp{position:absolute;top:9.3%;width:86.5%;left:6.75%;height:0;padding-bottom:153.8%;z-index:2;}
            .cssm-${uid} .m-notch{position:absolute;top:-7.5%;left:50%;width:40%;height:4%;margin-left:-20%;background:#111;border-radius:0 0 8px 8px;display:flex;align-items:center;justify-content:center;gap:10%;z-index:5;}
            .cssm-${uid} .m-notch:before{content:'';width:14%;padding-bottom:14%;border-radius:50%;background:#1e1e1e;border:1.5px solid #2a2a2a;}
            .cssm-${uid} .m-notch:after{content:'';width:5%;padding-bottom:5%;border-radius:50%;background:rgba(80,120,200,0.2);}
            .cssm-${uid} .m-sc{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;background:#0d1117;border-radius:4px;}
            .cssm-${uid} .m-hb{position:absolute;top:103.8%;left:50%;width:18%;height:9.7%;margin-left:-7.7%;background:#222;border-radius:50%;}
            .cssm-${uid} .m-hb:after{content:'';position:absolute;top:7%;left:16%;width:85%;height:85%;margin-left:-9%;background:#181818;border-radius:50%;}
            .cssm-${uid} .m-br{position:absolute;top:21.5%;right:-0.6%;width:1.3%;height:6.8%;background:#252525;border-top-right-radius:50% 5%;border-bottom-right-radius:50% 5%;}
            .cssm-${uid} .m-bl{position:absolute;top:13.5%;left:-0.6%;width:1.3%;height:3.8%;background:#252525;border-top-left-radius:50% 5%;border-bottom-left-radius:50% 5%;}
            .cssm-${uid} .m-bl:before{content:'';position:absolute;top:390%;right:0;height:180%;width:100%;background:#252525;border-top-left-radius:50% 3%;border-bottom-left-radius:50% 3%;}
            .cssm-${uid} .m-bl:after{content:'';position:absolute;top:181%;right:0;height:150%;width:100%;background:#252525;border-top-left-radius:50% 3%;border-bottom-left-radius:50% 3%;}
            .cssm-${uid} .m-hi{position:absolute;bottom:4%;left:50%;transform:translateX(-50%);width:26%;height:1%;background:rgba(255,255,255,0.22);border-radius:4px;}
        `}</style>
        <div className={`cssm-${uid}`}>
            <div className="m-bd">
                <div className="m-sp">
                    <div className="m-notch" />
                    <div className="m-sc">
                        <ScreenCarousel images={screenImages} interval={4000} resetKey={resetKey} />
                    </div>
                    <div className="m-hb" />
                </div>
                <div className="m-br" />
                <div className="m-bl" />
                <div className="m-hi" />
            </div>
        </div>
    </>
);

const CSSMonitor = ({ screenImages, uid = 'mon', maxWidth = 520 }) => (
    <>
        <style>{`
            .cssmon-${uid}{width:100%;max-width:${maxWidth}px;margin:0 auto;}
            .cssmon-${uid} *{box-sizing:border-box!important;}
            .cssmon-${uid} .mon-wrap{position:relative;width:100%;filter:drop-shadow(0 24px 60px rgba(0,0,0,0.75)) drop-shadow(0 4px 16px rgba(180,120,30,0.22));}
            .cssmon-${uid} .mon-shell{position:relative;width:100%;background:linear-gradient(160deg,#2a2a2a 0%,#1a1a1a 60%,#111 100%);border-radius:10px 10px 4px 4px;padding:10px 10px 6px 10px;box-shadow:0 0 0 1.5px #444,inset 0 1px 0 rgba(255,255,255,0.08),0 -2px 8px rgba(0,0,0,0.5);}
            .cssmon-${uid} .mon-top{position:relative;width:100%;display:flex;align-items:center;justify-content:center;padding-bottom:6px;}
            .cssmon-${uid} .mon-cam{width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#333,#111);border:1px solid #2a2a2a;}
            .cssmon-${uid} .mon-screen{position:relative;width:100%;height:0;padding-bottom:62%;background:#0d1117;border-radius:3px;overflow:hidden;border:1px solid #111;}
            .cssmon-${uid} .mon-inner{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;}
            .cssmon-${uid} .mon-neck{width:8%;height:0;padding-bottom:4.5%;background:linear-gradient(to bottom,#282828,#1e1e1e);margin:0 auto;}
            .cssmon-${uid} .mon-base{width:36%;height:0;padding-bottom:2.2%;margin:0 auto;background:linear-gradient(to bottom,#252525,#1a1a1a);border-radius:0 0 8px 8px;box-shadow:0 3px 12px rgba(0,0,0,0.6),0 0 0 1px #333;}
        `}</style>
        <div className={`cssmon-${uid}`}>
            <div className="mon-wrap">
                <div className="mon-shell">
                    <div className="mon-top"><div className="mon-cam" /></div>
                    <div className="mon-screen">
                        <div className="mon-inner">
                            <ScreenCarousel images={screenImages} interval={4200} />
                        </div>
                    </div>
                </div>
                <div className="mon-neck" />
                <div className="mon-base" />
            </div>
        </div>
    </>
);

const Callout = ({ uid, label, Icon, gradient, glow, pillDir, imageEdge, topPx, bottomPx, dotD, pillW, pillH, iconDot, fs, delay, edgePadPx, onClick }) => {
    const ov = pillH / 2;
    const aPW = pillW + ov;
    const W = aPW + dotD - ov;
    const H = Math.max(pillH, dotD);
    const iL = pillDir === 'right' ? 0 : pillW;
    const pL = pillDir === 'right' ? dotD - ov : ov;
    const pT = (H - pillH) / 2;
    const pR = pillH / 2;
    const pBR = pillDir === 'right' ? `0 ${pR}px ${pR}px 0` : `${pR}px 0 0 ${pR}px`;
    const aS = imageEdge === 'left' ? { left: edgePadPx } : { right: edgePadPx };
    const vS = bottomPx !== undefined ? { bottom: bottomPx } : { top: topPx ?? 0 };
    const cs = pillDir === 'right' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
    return (
        <>
            <style>{`
                @keyframes ${uid}_show{0%,8%{opacity:0;}16%{opacity:1;}65%{opacity:1;}80%,100%{opacity:0;}}
                @keyframes ${uid}_wipe{0%,8%{clip-path:${cs};}20%{clip-path:inset(0 0 0 0);}65%{clip-path:inset(0 0 0 0);}80%,100%{clip-path:${cs};}}
                @keyframes ${uid}_ring{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0.45);}50%{box-shadow:0 0 0 8px rgba(255,255,255,0);}}
            `}</style>
            <div onClick={onClick} title={label} style={{ position: 'absolute', width: W, height: H, cursor: 'pointer', zIndex: 30, display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', boxShadow: 'none', ...aS, ...vS, animation: `${uid}_show 5s ease-in-out ${delay}s infinite` }}>
                <div style={{ position: 'absolute', left: iL, top: (H - dotD) / 2, width: dotD, height: dotD, borderRadius: '50%', background: gradient, border: '2.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 18px ${glow}`, zIndex: 2, animation: `${uid}_ring 2.2s ease-in-out ${delay + 1.2}s infinite` }}>
                    <Icon s={iconDot} />
                </div>
                <div style={{ position: 'absolute', left: pL, top: pT, width: aPW, height: pillH, borderRadius: pBR, background: gradient, border: '1.8px solid rgba(255,255,255,0.28)', borderLeft: pillDir === 'right' ? 'none' : undefined, borderRight: pillDir === 'left' ? 'none' : undefined, boxShadow: `0 4px 20px ${glow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', zIndex: 1, animation: `${uid}_wipe 5s ease-in-out ${delay}s infinite`, overflow: 'hidden' }}>
                    <span style={{ color: '#fff', fontSize: fs, fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.3px', fontFamily: "'Libre Baskerville',serif" }}>{label}</span>
                </div>
            </div>
        </>
    );
};

// ─── FIXED BrandCards: 2x2 grid layout matching screenshot ───────────────────
const BrandCards = ({ mob, tab, activeBrand, onBrandClick }) => {
    const brands = [
        { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mukta.webp', name: 'Mukta', sub: 'Jewelry & Accessories', dark: true, bi: 0 },
        { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/8-1.png.webp', name: 'Khambani', sub: 'Food Products', dark: true, bi: 1 },
        { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/tarushlogo.png', name: 'TarushPranna', sub: 'E-commerce', dark: false, bi: 2 },
        { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/9-1.png.webp', name: 'Baba Ji Ki Buti', sub: 'E-commerce', dark: false, bi: 3 },
    ];

    const cardH = mob ? 48 : tab ? 58 : 70;
    const imgSz = mob ? 34 : tab ? 40 : 50;
    const gap = mob ? 6 : tab ? 8 : 10;
    const brad = mob ? 8 : 10;

    const Card = ({ b }) => {
        const isActive = activeBrand === b.bi;
        return (
            <div
                onClick={() => onBrandClick(b.bi)}
                style={{
                    flex: '1 1 0',
                    height: cardH,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: brad,
                    display: 'flex',
                    alignItems: 'center',
                    padding: mob ? '0 8px' : '0 12px',
                    gap: mob ? 6 : 9,
                    background: b.dark
                        ? 'linear-gradient(135deg,rgba(22,12,3,0.97),rgba(42,22,6,0.99))'
                        : 'linear-gradient(135deg,rgba(248,238,215,0.97),rgba(238,225,198,0.98))',
                    border: isActive ? '2px solid rgba(230,195,92,0.95)' : `1.5px solid ${b.dark ? 'rgba(197,160,40,0.55)' : 'rgba(160,120,60,0.5)'}`,
                    boxShadow: isActive ? '0 0 14px rgba(230,195,92,0.45)' : b.dark ? '0 4px 18px rgba(0,0,0,0.55)' : '0 3px 12px rgba(100,70,20,0.18)',
                    transform: isActive ? 'translateY(-2px) scale(1.03)' : 'none',
                    transition: 'transform 0.2s, box-shadow 0.2s, border 0.2s',
                    willChange: 'transform',
                    minWidth: 0,
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.transform = ''; } }}
            >
                <img src={b.src} alt={b.name} style={{ width: imgSz, height: imgSz, objectFit: 'contain', borderRadius: mob ? 5 : 7, flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: mob ? '0.62rem' : tab ? '0.7rem' : '0.8rem', fontWeight: 700, color: b.dark ? ec.gold : '#3D2B1F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: mob ? '0.45rem' : tab ? '0.52rem' : '0.58rem', color: b.dark ? 'rgba(201,178,138,0.72)' : 'rgba(107,66,38,0.72)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.sub}</span>
                </div>
                {isActive && <div style={{ marginLeft: 'auto', flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: ec.gold }} />}
            </div>
        );
    };

    // 2x2 grid: top row = Mukta + Khambani, bottom row = Terra + Baba Ji
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
            <div style={{ display: 'flex', gap }}>
                <Card b={brands[0]} />
                <Card b={brands[1]} />
            </div>
            <div style={{ display: 'flex', gap }}>
                <Card b={brands[2]} />
                <Card b={brands[3]} />
            </div>
        </div>
    );
};

const MID_CAROUSEL_ITEMS = [
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/r16.webp', title: 'Razorpay' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/cashfreeLogo.webp', title: 'CashFree' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/unnamed.png', title: 'PayU' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ccavenueLogo.png', title: 'CCAvenue' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PhonePe-Logo.png', title: 'PhonePe' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/StripeLogo.png', title: 'Stripe' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/1-3.png', title: 'Instamojo' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PaytmLogo.webp', title: 'Paytm' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/AmazonPay.png', title: 'Amazon Pay' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/BilldeskLogo.webp', title: 'BillDesk' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/payglocalLogo.webp', title: 'PayGLocal' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/OpenLogo.png', title: 'Open' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/zoho.webp', title: 'Zoho' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/paykunLogo.png', title: 'Paykun' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ZaakpayLogo.webp', title: 'ZaakPay' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ESBLogo.png', title: 'ESB Gateway' },
];

const LAST_CAROUSEL_ITEMS = [
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ClickpostLogo.webp', title: 'ClickPost' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipwayLogo.webp', title: 'Shipway' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PickrrLogo.png', title: 'Pickrr' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipyaariLogo.png', title: 'Shipyaari' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipdelightLogo.webp', title: 'ShipDelight' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/WareIQLogo.png', title: 'WareIQ' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VamashipLogo.webp', title: 'VamaShip' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShipkaroLogo.png', title: 'ShipKaro' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/AftershipLogo.png', title: 'AfterShip' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/EasyshipLogo.png', title: 'Easyship' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ShippoLogo.webp', title: 'Shippo' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ParcelPerformLogo.webp', title: 'Parcel Perform' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/NarvarLogo.webp', title: 'Narvar' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shipstationlogo.webp', title: 'ShipStation' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/zippyLogo.jfif', title: 'Zippy' },
];

const MidCarousel = ({ tab, mob }) => {
    const [idx, setIdx] = useState(0);
    const [fade, setFade] = useState(true);
    const [imgKey, setImgKey] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIdx(p => {
                    const next = (p + 1) % MID_CAROUSEL_ITEMS.length;
                    setImgKey(k => k + 1);
                    return next;
                });
                setFade(true);
            }, 280);
        }, 4500);
        return () => clearInterval(t);
    }, []);

    const item = MID_CAROUSEL_ITEMS[idx];
    const logoH = mob ? 56 : tab ? 64 : 76;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: mob ? 6 : tab ? 8 : 12,
            flex: 1,
            minWidth: 0,
            width: '100%',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.28s ease-in-out',
        }}>
            <div style={{
                flex: '0 0 55%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: logoH,
            }}>
                <div style={{
                    width: '160%',
                    height: logoH,
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: '#ffffff',
                    border: '1px solid rgba(180,180,180,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                    boxSizing: 'border-box',
                }}>
                    <img
                        key={imgKey}
                        src={item.icon}
                        alt={item.title}
                        loading="eager"
                        decoding="sync"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', transform: item.title === 'Razorpay' ? 'scale(1.25)' : 'none' }}
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                </div>
            </div>
            <div style={{ flex: '0 0 45%', textAlign: 'center', minWidth: 0 }}>
                <span style={{
                    fontFamily: "'Libre Baskerville',serif",
                    fontSize: mob ? '0.88rem' : tab ? '0.95rem' : '1.08rem',
                    fontWeight: 700,
                    color: '#fff',
                    display: 'block',
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {item.title}
                </span>
                <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: mob ? '0.62rem' : tab ? '0.62rem' : '0.7rem',
                    color: 'rgba(200,235,255,0.7)',
                    fontWeight: 500,
                    margin: '3px 0 0',
                    whiteSpace: 'nowrap',
                }}>
                    Payments Secured
                </p>
            </div>
        </div>
    );
};

const LastCarousel = ({ tab, mob }) => {
    const [idx, setIdx] = useState(0);
    const [fade, setFade] = useState(true);
    const [imgKey, setImgKey] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIdx(p => {
                    const next = (p + 1) % LAST_CAROUSEL_ITEMS.length;
                    setImgKey(k => k + 1);
                    return next;
                });
                setFade(true);
            }, 280);
        }, 5000);
        return () => clearInterval(t);
    }, []);

    const item = LAST_CAROUSEL_ITEMS[idx];
    const logoH = mob ? 56 : tab ? 64 : 76;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: mob ? 6 : tab ? 8 : 12,
            flex: 1,
            minWidth: 0,
            width: '100%',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.28s ease-in-out',
        }}>
            <div style={{
                flex: '0 0 55%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: logoH,
            }}>
                <div style={{
                    width: '160%',
                    height: logoH,
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: '#ffffff',
                    border: '1px solid rgba(180,180,180,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                    boxSizing: 'border-box',
                }}>
                    <img
                        key={imgKey}
                        src={item.icon}
                        alt={item.title}
                        loading="eager"
                        decoding="sync"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                </div>
            </div>
            <div style={{ flex: '0 0 45%', textAlign: 'center', minWidth: 0 }}>
                <span style={{
                    fontFamily: "'Libre Baskerville',serif",
                    fontSize: mob ? '0.88rem' : tab ? '0.95rem' : '1.08rem',
                    fontWeight: 700,
                    color: '#fff',
                    display: 'block',
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {item.title}
                </span>
                <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: mob ? '0.62rem' : tab ? '0.62rem' : '0.7rem',
                    color: 'rgba(200,235,255,0.7)',
                    fontWeight: 500,
                    margin: '3px 0 0',
                    whiteSpace: 'nowrap',
                }}>
                    Auto Pickup &amp; Dispatch
                </p>
            </div>
        </div>
    );
};

const RE_BRAND_ICONS = [
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/PortfolioProjects/Social-Media/SocialMedia-Real-Estate/social-media-real-estate-CI%20Builders-img1.webp', name: 'CI BUILDERS', url: 'https://cibuilders.in/' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/mangalam.webp', name: 'MANGALAM LANDMARKS', url: 'https://mangalamlandmarks.in/' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Home-Page/Home-Page-Janki-Group-Logo.webp', name: 'JANKI BUILDERS', url: 'https://jankibuilders.com/projects/' },
    { icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/fortune.png', name: 'FORTUNE BUILDERS', url: 'https://fortunebuilders.co/' },
];

const REBrandCarousel = ({ containerIndex, tab, mob }) => {
    const [globalTick, setGlobalTick] = React.useState(0);

    React.useEffect(() => {
        const t = setInterval(() => setGlobalTick(p => p + 1), 5500);
        return () => clearInterval(t);
    }, []);

    const [fade, setFade] = React.useState(true);
    const prevTick = React.useRef(globalTick);

    React.useEffect(() => {
        if (prevTick.current !== globalTick) {
            setFade(false);
            const id = setTimeout(() => { setFade(true); }, 300);
            prevTick.current = globalTick;
            return () => clearTimeout(id);
        }
    }, [globalTick]);

    const idx = (globalTick + containerIndex) % RE_BRAND_ICONS.length;
    const b = RE_BRAND_ICONS[idx];
    const iconW = mob ? 85 : tab ? 110 : 140;
    const iconH = mob ? 42 : tab ? 52 : 66;

    return (
        <div
            onClick={() => b.url && window.open(b.url, '_blank', 'noopener,noreferrer')}
            style={{
                opacity: fade ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: mob ? 4 : tab ? 5 : 6,
                cursor: b.url ? 'pointer' : 'default'
            }}
        >
            <div style={{
                width: iconW, height: iconH,
                borderRadius: mob ? 8 : tab ? 10 : 12,
                overflow: 'hidden',
                background: '#ffffff',
                border: '1.5px solid rgba(220,170,60,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: mob ? 5 : tab ? 6 : 8,
                boxSizing: 'border-box',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}>
                <img
                    src={b.icon} alt={b.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: mob ? 4 : tab ? 6 : 8, opacity: 0.95 }}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                />
            </div>
            <span style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: mob ? '0.48rem' : tab ? '0.58rem' : '0.65rem',
                color: 'rgba(240,223,160,0.75)',
                fontWeight: 600, textAlign: 'center', lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: iconW + 10,
            }}>{b.name}</span>
        </div>
    );
};

const ngoStatBoxes = [
    { big: '900+', line1: 'Websites', line2: 'Engineered', desc: 'Digital platforms built for the motive of organizations, 550 of them for non-profits' },
    { big: '1100+ Crore', line1: 'Secure, scalable', line2: 'Donation systems', desc: 'End-to-end donation flows that process crores securely' },
    { big: '300+', line1: 'Advanced ', line2: 'NGO Functions', desc: 'Automation, tracking and the  donor management' },
];

type NgoPersonPosition = {
    left: string;
    top?: string;
    bottom?: string;
    width: string;
    zIndex: number;
    rotate?: string;
};

type NgoPerson = {
    name: string;
    f: string;
    url?: string;
    image: string;
    position: NgoPersonPosition;
    tabPosition?: Partial<NgoPersonPosition>;
    mobilePosition?: Partial<NgoPersonPosition>;
};

const ngoPeople: NgoPerson[] = [
    {
        name: 'Devi\nChitralekha',
        f: '6.7M+\nFollowers',
        url: 'https://gausevadham.org/',
        image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/devichitra.webp',
        position: {
            left: '19%',
            bottom: '0%',
            width: '22%',
            zIndex: 16,
            rotate: '-1deg',
        },
        mobilePosition: {
            left: '25%',
            bottom: '0%',
            width: '30%',
        },
    },
    {
        name: 'Harsh\nChikkara',
        f: '1.2M+\nFollowers',
        url: 'https://harshchhikara.com/',
        image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/harshi.webp',
        position: {
            left: '62%',
            bottom: '0%',
            width: '30%',
            zIndex: 9,
            rotate: '0deg',
        },
        mobilePosition: {
            left: '65%',
            // Stands on the collage floor. Any lift here is multiplied by the
            // scale(1.55) below and pushes his head out of the 225px box.
            bottom: '0%',
            width: '40%',
        },
    },
    {
        name: 'Popatbhai\nFoundation',
        f: '1.9M+\nFollowers',
        url: 'https://popatbhaicharitablefoundation.org/',
        image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Popat.webp',
        position: {
            left: '20%',
            bottom: '5%',
            width: '27%',
            zIndex: 7,
            rotate: '0deg',
        },
        mobilePosition: {
            left: '15%',
            bottom: '0%',
            width: '40%',
        },
    },
    {
        name: 'Mahipat\nSingh',
        f: '1.3M+\nFollowers',
        url: 'https://mahipatsinhfoundation.org/',
        image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/founder-open.webp',
        position: {
            left: '40%',
            bottom: '20%',
            width: '27%',
            zIndex: 8,
            rotate: '0deg',
        },
        mobilePosition: {
            left: '35%',
            bottom: '0%',
            width: '40%',
        },
    },
    {
        name: 'Mallakhamb\nArtist',
        f: '500K+\nFollowers',
        url: 'https://mallakhambartist.org/',
        image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/makkhammain.webp',
        position: {
            left: '-4%',
            bottom: '0%',
            width: '33%',
            zIndex: 11,
            rotate: '0deg',
        },
        mobilePosition: {
            top: '50%',
            left: '-5%',
            bottom: '0%',
            width: '40%',
        },
    },
    {
        name: 'Ganesh\nNayak',
        f: '1M+\nFollowers',
        url: 'https://amtmindia.org/',
        image: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/Nayak.webp',
        position: {
            left: '38%',
            bottom: '0%',
            width: '30%',
            zIndex: 12,
            rotate: '0deg',
        },
        mobilePosition: {
            left: '65%',
            bottom: '0%',
            width: '35%',
        },
    },
];

const HeroCarousel = () => {
    const navigate = useNavigate();

    const [slide, setSlide] = useState(0);
    const [winW, setWinW] = useState(1440);
    const [winH, setWinH] = useState(900);
    const [autoPlay, setAutoPlay] = useState(true);
    const [visible, setVisible] = useState(true);
    const [gifHover, setGifHover] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [activeBrand, setActiveBrand] = useState(0);
    const [brandKey, setBrandKey] = useState(0);
    const [selectedNgoPersonIndex, setSelectedNgoPersonIndex] = useState<number>(0);

    const wrapperRef = useRef(null);
    const manualNav = useRef(false);
    const brandTimer = useRef(null);
    const ngoTimer = useRef(null);
    // ─── touch refs for swipe ───────────────────────────────────────────────
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchStartTime = useRef(0);

    const mob = winW < 768;
    const tab = winW >= 768 && winW < 1024;
    const desk = winW >= 1024;

    const navH = mob ? NAV_H_MOB : tab ? NAV_H_TAB : NAV_H_DESK;

    // The mobile bottom dock is fixed over the last 57px of the viewport, so
    // every slide has to end above it or its CTAs disappear underneath.
    // On short handsets we also claw back some of the generous top padding
    // so the slide still fits without the content being pushed off-screen.
    const DOCK_H = 57;
    const dockH = mob ? DOCK_H : 0;
    const shortVh = winH <= 740;
    const veryShortVh = winH <= 660;

    const origSlide = SLIDE_ORDER[slide];
    const isFounderSlide = origSlide in SLIDE_TO_FOUNDER;
    const cur = isFounderSlide ? SLIDES[SLIDE_TO_FOUNDER[origSlide]] : SLIDES[0];
    const currentService = isFounderSlide ? SERVICES[SLIDE_SERVICE_INDEX[origSlide]] : SERVICES[4];

    const laptopImgs = BRAND_CONFIG[activeBrand]?.laptopImages ?? ECOM_LAPTOP_ALL;
    const mobileImgs = BRAND_CONFIG[activeBrand]?.mobileImages ?? ECOM_MOBILE_ALL;

    useEffect(() => {
        let t;
        const rs = () => { clearTimeout(t); t = setTimeout(() => { setWinW(window.innerWidth); setWinH(window.innerHeight); }, 100); };

    // Sync to the real viewport immediately after mount. The initial state is
    // fixed at the pre-render value so hydration matches; without this line a
    // phone would stay on the desktop layout until the first resize event.
        setWinW(window.innerWidth);
        setWinH(window.innerHeight);
        window.addEventListener('resize', rs, { passive: true });
        return () => { window.removeEventListener('resize', rs); clearTimeout(t); };
    }, []);

    useEffect(() => {
        const f = () => setVisible(!document.hidden);
        document.addEventListener('visibilitychange', f);
        return () => document.removeEventListener('visibilitychange', f);
    }, []);

    useEffect(() => {
        if (!autoPlay || !visible) return;
        const t = setInterval(() => setSlide(p => (p + 1) % TOTAL_SLIDES), 8000);
        return () => clearInterval(t);
    }, [autoPlay, visible]);

    useEffect(() => {
        if (mob) return;
        const mv = e => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 15, y: (e.clientY / window.innerHeight - 0.5) * 15 });
        window.addEventListener('mousemove', mv, { passive: true });
        return () => window.removeEventListener('mousemove', mv);
    }, [mob]);

    useEffect(() => {
        if (!manualNav.current) return;
        manualNav.current = false;
        try {
            const el = wrapperRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        } catch (_) {
            wrapperRef.current?.scrollIntoView({ block: 'start' });
        }
    }, [slide]);

    const startBrandTimer = useCallback(() => {
        clearInterval(brandTimer.current);
        brandTimer.current = setInterval(() => {
            setActiveBrand(p => { const n = (p + 1) % BRAND_CONFIG.length; setBrandKey(k => k + 1); return n; });
        }, 5500);
    }, []);

    useEffect(() => {
        if (origSlide === 1) { startBrandTimer(); }
        else { clearInterval(brandTimer.current); }
        return () => clearInterval(brandTimer.current);
    }, [origSlide, startBrandTimer]);

    const startNgoTimer = useCallback(() => {
        clearInterval(ngoTimer.current);
        ngoTimer.current = setInterval(() => {
            setSelectedNgoPersonIndex(p => (p + 1) % ngoPeople.length);
        }, 3000);
    }, []);

    useEffect(() => {
        if (origSlide === 0) {
            document.body.setAttribute('data-active-slide', 'ngo');
        } else {
            document.body.removeAttribute('data-active-slide');
        }
        return () => {
            document.body.removeAttribute('data-active-slide');
        };
    }, [origSlide]);

    useEffect(() => {
        if (origSlide === 0 && autoPlay && visible) { startNgoTimer(); }
        else { clearInterval(ngoTimer.current); }
        return () => clearInterval(ngoTimer.current);
    }, [origSlide, autoPlay, visible, startNgoTimer]);

    const handleNgoPersonClick = useCallback((index) => {
        setSelectedNgoPersonIndex(index);
        startNgoTimer();
    }, [startNgoTimer]);

    const handleBrandClick = useCallback((bi) => {
        setActiveBrand(bi);
        setBrandKey(k => k + 1);
        startBrandTimer();
    }, [startBrandTimer]);

    const prev = useCallback(() => { manualNav.current = true; setSlide(p => (p - 1 + TOTAL_SLIDES) % TOTAL_SLIDES); setAutoPlay(false); setTimeout(() => setAutoPlay(true), 10000); }, []);
    const next = useCallback(() => { manualNav.current = true; setSlide(p => (p + 1) % TOTAL_SLIDES); setAutoPlay(false); setTimeout(() => setAutoPlay(true), 10000); }, []);

    // ─── Improved touch handlers: support swipe gesture ─────────────────────
    const handleTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = Date.now();
    }, []);

    const handleTouchEnd = useCallback((e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        const dt = Date.now() - touchStartTime.current;
        // Require: horizontal swipe, more horizontal than vertical, fast enough, minimum distance
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40 && dt < 500) {
            if (dx < 0) next(); else prev();
        }
    }, [next, prev]);

    const openLink = l => window.open(l, '_blank', 'noopener,noreferrer');
    const short = s => mob ? s.replace(/ (Followers?|Subscribers?|Subs)/i, '') : s;

    const SZ = {
        dotD: mob ? 26 : tab ? 42 : 50,
        fbDotD: mob ? 26 : tab ? 48 : 65,
        pillW: mob ? 78 : tab ? 128 : 152,
        pillH: mob ? 26 : tab ? 42 : 50,
        iconDot: mob ? 12 : tab ? 20 : 24,
        fs: mob ? '0.42rem' : tab ? '0.65rem' : '0.72rem',
        igTop: mob ? 48 : tab ? 68 : 85,
        ytBottom: mob ? 55 : tab ? 85 : 105,
        fbTop: mob ? 48 : tab ? 68 : 85,
        edgePadLeft: mob ? -10 : 10,
        fbEdgePad: mob ? 4 : tab ? -8 : -12,
    };

    const slidePad = {
        // The header pill is navH tall but sits at top:20, so its bottom edge is
        // 20 + navH. Using navH alone put the heading BEHIND the header on short
        // handsets (60 + 12 = 72, header bottom = 80). 20 + navH + gap keeps the
        // 100px opening on normal screens and still clears the header on short ones.
        top: mob ? 20 + navH + (shortVh ? 12 : 20) : tab ? navH + 38 : navH + 48,
        side: mob ? 16 : tab ? 20 : 40,
        bot: mob ? (shortVh ? 10 : 16) + dockH : tab ? 18 : 20,
    };


    const StatCards = () => (
        <div style={{ display: 'flex', flexDirection: 'row', gap: mob ? '7px' : tab ? '10px' : '13px', width: '100%' }}>
            {ngoStatBoxes.map((box, i) => (
                <div key={`ngostat-${i}`} style={{ flex: '1 1 0', minHeight: mob ? 100 : tab ? 130 : 150, background: ngo.cardBg, border: ngo.cardBorder, borderRadius: mob ? 10 : 13, padding: mob ? '10px 4px' : tab ? '13px 9px' : '17px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: mob ? '3px' : '5px', boxShadow: '0 3px 14px rgba(100,70,20,0.14)' }}>
                    <span style={{ display: 'block', fontSize: mob ? '0.78rem' : tab ? '1.2rem' : '1.5rem', fontWeight: 800, color: ngo.dark, fontFamily: "'Libre Baskerville',serif", lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: mob ? 'nowrap' : 'normal' }}>{box.big}</span>
                    <span style={{ display: 'block', fontSize: mob ? '0.58rem' : tab ? '0.68rem' : '0.78rem', fontWeight: 700, color: ngo.dark, fontFamily: "'Libre Baskerville',serif", lineHeight: 1.2 }}>{box.line1}</span>
                    {box.line2 ? <span style={{ display: 'block', fontSize: mob ? '0.54rem' : tab ? '0.63rem' : '0.72rem', fontWeight: 600, color: ngo.mid, fontFamily: "'Libre Baskerville',serif", lineHeight: 1.2 }}>{box.line2}</span> : null}
                    <div style={{ width: '65%', height: 1, background: 'rgba(160,120,60,0.38)', margin: '3px 0' }} />
                    <span style={{ display: 'block', fontSize: mob ? '0.49rem' : tab ? '0.58rem' : '0.64rem', color: ngo.mid, fontFamily: "'Inter',sans-serif", lineHeight: 1.42 }}>{box.desc}</span>
                </div>
            ))}
        </div>
    );

    const PeopleBoxes = () => (
        <div
            className="ngo-people-row"
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: mob ? '6px' : tab ? '8px' : '10px',
                width: '100%',
                overflowX: mob ? 'auto' : 'visible',
                scrollbarWidth: 'none',
            }}
        >
            {ngoPeople.map((p, i) => {
                const isSelected = selectedNgoPersonIndex === i;
                return (
                    <div
                        key={`ngop-${i}`}
                        onClick={() => handleNgoPersonClick(i)}
                        style={{
                            flex: '1 1 0',
                            minWidth: mob ? '60px' : 0,
                            minHeight: mob ? 55 : tab ? 70 : 80,
                            background: isSelected ? '#3D2B1F' : ngo.peopleBg,
                            border: isSelected ? '2px solid #3D2B1F' : ngo.peopleBorder,
                            borderRadius: mob ? 8 : 10,
                            padding: mob ? '7px 4px' : tab ? '9px 6px' : '11px 8px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: mob ? '2px' : '4px',
                            boxShadow: isSelected ? '0 4px 16px #3D2B1F' : '0 2px 10px rgba(100,70,20,0.1)',
                            cursor: 'pointer',
                            transition: 'background 200ms ease, border 200ms ease, box-shadow 200ms ease',
                        }}
                    >
                        <span
                            style={{
                                display: 'block',
                                fontSize: mob ? '0.54rem' : tab ? '0.75rem' : '0.82rem',
                                fontWeight: 700,
                                color: isSelected ? '#fff' : ngo.dark,
                                fontFamily: "'Libre Baskerville',serif",
                                lineHeight: 1.18,
                                whiteSpace: 'pre-line',
                            }}
                        >
                            {p.name}
                        </span>

                        <div style={{ width: '50%', height: '1px', background: isSelected ? 'rgba(255,255,255,0.5)' : 'rgba(160,120,60,0.32)' }} />

                        <span
                            style={{
                                display: 'block',
                                fontSize: mob ? '0.5rem' : tab ? '0.58rem' : '0.63rem',
                                color: isSelected ? '#fff3cc' : ngo.mid,
                                fontFamily: "'Inter',sans-serif",
                                fontWeight: 600,
                                lineHeight: 1.3,
                                whiteSpace: 'pre-line',
                            }}
                        >
                            {p.f}
                        </span>
                    </div>
                );
            })}
        </div>
    );

    // ─── SLIDE 0 NGO ───────────────────────────────────────────────────────

    // `ratio` sizes the box from its own width instead of a fixed pixel height.
    // Each figure is positioned with a percentage width, so its rendered height
    // grows with the container's width - on a 430px phone the tallest figure came
    // out 247px inside a 225px box and lost his head to overflow:hidden. Tying
    // height to width keeps the same headroom on every screen.
    const NGOPersonCollage = ({ height, radius, ratio }: { height: number; radius: number; ratio?: number }) => (
        <div
            style={{
                width: '100%',
                ...(ratio ? { height: 'auto', aspectRatio: `1 / ${ratio}` } : { height }),
                position: 'relative',
                overflow: 'hidden',
                borderRadius: radius,
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                isolation: 'isolate',
            }}
        >
            {ngoPeople.map((person, index) => {
                const responsivePosition = mob
                    ? person.mobilePosition
                    : tab
                        ? person.tabPosition
                        : undefined;

                const pos = {
                    ...person.position,
                    ...responsivePosition,
                };

                const isSelected = selectedNgoPersonIndex === index;

                return (
                    <img
                        key={`ngo-person-img-${person.name}`}
                        src={person.image}
                        // Responsive sources. The originals are 1700px wide and were
                        // being served whole to 390px phones — measured as a 7,120ms
                        // LCP on throttled mobile. 480w/800w variants exist alongside
                        // each original on R2; the browser now picks by viewport.
                        srcSet={[
                            `${person.image.replace(/\.webp$/, '-480w.webp')} 480w`,
                            `${person.image.replace(/\.webp$/, '-800w.webp')} 800w`,
                            `${person.image} 1700w`,
                        ].join(', ')}
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw"
                        alt={person.name.replace('\n', ' ')}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        style={{
                            position: 'absolute',
                            left: pos.left,
                            top: pos.top,
                            bottom: pos.bottom ?? '0%',
                            width: pos.width,
                            maxHeight: 'none',
                            height: 'auto',
                            objectFit: 'contain',
                            objectPosition: 'bottom center',
                            display: 'block',
                            pointerEvents: 'none',
                            userSelect: 'none',
                            zIndex: pos.zIndex,
                            opacity: 1,
                            filter: isSelected
                                ? 'drop-shadow(0 0 14px rgba(230,195,92,0.95)) drop-shadow(0 0 14px rgba(230,195,92,0.55))'
                                : 'none',
                            // Measured, not guessed. At 901px the frame was 255px tall while the
                            // tallest cut-out rendered 400px at scale 1.55 — 145px of head
                            // clipped by overflow:hidden. Unscaled that figure is already
                            // 258px, so the frame was the real problem; both were adjusted
                            // together. 1.2 leaves every figure inside its taller frame with
                            // room to spare at every breakpoint.
                            transform: `rotate(${pos.rotate ?? '0deg'}) scale(1.35)`,
                            transformOrigin: 'bottom center',
                            transition: 'filter 220ms ease',
                            WebkitBackfaceVisibility: 'hidden',
                            backfaceVisibility: 'hidden',
                        }}
                    />
                );
            })}
        </div>
    );
    const renderNGOSlide = () => (
        <>
            <style>{`
                @keyframes ngo_in{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
                @keyframes ngo_pulse{0%,100%{box-shadow:0 2px 16px rgba(109,66,38,0.2),inset 0 1px 0 rgba(255,255,255,0.55);}50%{box-shadow:0 4px 26px rgba(109,66,38,0.35),inset 0 1px 0 rgba(255,255,255,0.8);}}
                .ngo-pr::-webkit-scrollbar{display:none;} .ngo-pr{-ms-overflow-style:none;scrollbar-width:none;}
                /* The floating GI Assistant and WhatsApp launchers are fixed to
                   the bottom-right corner, and this row of people cards is the
                   bottom-right of the hero. The row's bottom sits at a fixed
                   754px, and the launcher stack starts 143px above the bottom of
                   the window, so they collide on any window shorter than about
                   897px — measured at 1470x800, the launcher covered the last
                   card by 127x42px and swallowed its follower count. The cards
                   are clickable, so that also ate the click.
                   The gutter is 148px because the launcher's left edge is
                   127px inside the row's right edge at every width (both are
                   right-anchored), plus room to breathe. Above 900px tall there
                   is no collision and the cards keep their full width. */
                @media (min-width:1024px) and (max-height:900px){
                  .ngo-people-row{padding-right:148px;}
                }
                @media (min-width:1024px) and (max-height:700px){
                  .ngo-people-row{padding-right:160px;}
                }
                .ngo-cta-btn{display:inline-flex;align-items:center;justify-content:center;background:rgba(245,230,175,0.92);border:1.5px solid rgba(160,120,60,0.6);border-radius:30px;padding:0.66rem 2.3rem;color:#3D2B1F;font-family:'Libre Baskerville',serif;font-weight:700;font-size:0.92rem;cursor:pointer;letter-spacing:0.3px;text-decoration:none;animation:ngo_pulse 3s ease-in-out infinite;transition:transform 0.2s;}
                .ngo-cta-btn:hover{transform:translateY(-2px) scale(1.04);animation:none;}
                .ngo-cta-btn.mob{padding:0.52rem 1.8rem;font-size:0.82rem;}
                .ngo-cta-btn.tab{padding:0.58rem 1.9rem;font-size:0.86rem;}
            `}</style>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/bg.webp')", backgroundSize: 'cover', backgroundPosition: 'center top', zIndex: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(238,212,148,0.22)', zIndex: 1 }} />

            {mob && (
                <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: `${slidePad.top}px ${slidePad.side}px ${slidePad.bot}px`, display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }}>
                    <h1 style={{ fontFamily: "'Libre Baskerville',serif", color: ngo.dark, fontSize: '1.52rem', fontWeight: 700, lineHeight: 1.22, margin: 0, textAlign: 'center', textShadow: '0 1px 8px rgba(255,255,255,0.4)' }}>We Build Digital Systems.<br />That Help NGO's<br /> Raise Crores.</h1>
                    <StatCards />
                    {/* 320px pushed the CTAs to 899px in an 812px viewport, so nobody could
    tap them without scrolling. 225px brings the whole slide inside the
    fold while keeping the collage substantial. */}
                      <NGOPersonCollage height={280} radius={12} ratio={0.82} />
                    <div className="ngo-pr" style={{ display: 'flex', flexDirection: 'row', gap: '6px', width: '100%', overflowX: 'auto', paddingBottom: '2px' }}>
                        {ngoPeople.map((p, i) => {
                            const isSel = selectedNgoPersonIndex === i;
                            return (
                                <div
                                    key={`ngomobp-${i}`}
                                    onClick={() => handleNgoPersonClick(i)}
                                    style={{
                                        flex: '1 1 0',
                                        // Six chips at 60px overflowed a 358px row and clipped the
                                        // last name. 52px lets all six sit inside the viewport.
                                        minWidth: '52px',
                                        background: isSel ? '#C5A028' : ngo.peopleBg,
                                        border: isSel ? '2px solid #8B6914' : ngo.peopleBorder,
                                        borderRadius: 8,
                                        padding: '8px 3px',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '3px',
                                        cursor: 'pointer',
                                        boxShadow: isSel ? '0 4px 16px rgba(139,105,20,0.5)' : 'none',
                                        transition: 'background 200ms ease, border 200ms ease, box-shadow 200ms ease',
                                    }}
                                >
                                    <span style={{ display: 'block', fontSize: '0.54rem', fontWeight: 700, color: isSel ? '#2B1A00' : ngo.dark, fontFamily: "'Libre Baskerville',serif", lineHeight: 1.18, whiteSpace: 'pre-line' }}>{p.name}</span>
                                    <div style={{ width: '50%', height: '1px', background: isSel ? 'rgba(43,26,0,0.45)' : 'rgba(160,120,60,0.32)' }} />
                                    <span style={{ display: 'block', fontSize: '0.52rem', color: isSel ? '#3B2404' : ngo.mid, fontFamily: "'Inter',sans-serif", fontWeight: 600, lineHeight: 1.3, whiteSpace: 'pre-line' }}>{p.f}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="hero-cta-mob" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px', marginTop: 'auto' }}>
                        <Link to="/pages/NgoPage" className="ngo-cta-btn mob" style={{ flex: '1 1 0', textAlign: 'center' }}>Explore NGO</Link>
                        <Link to="/portfolio/ngo" className="ngo-cta-btn mob" style={{ flex: '1 1 0', textAlign: 'center' }}>Portfolio</Link>
                    </div>
                </div>
            )}

            {!mob && (
                <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: `${slidePad.top + 30}px ${slidePad.side}px ${slidePad.bot}px`, boxSizing: 'border-box', marginTop: "60px" }}>
                    <div style={{
                        width: '100%', maxWidth: 1400, display: 'grid',
                        /* Two fixes here.
                           1fr means minmax(auto, 1fr), and "auto" floors the track at its
                           min-content width. The image column refuses to shrink, so at 768px
                           the tracks resolved to 259 + 520 + 20 = 798 inside a 728px box: the
                           grid burst its own container and the whole page scrolled sideways.
                           minmax(0, …) lets the track shrink and ends the overflow.

                           On a tablet even the corrected split leaves the text column near
                           300px, which squeezed the three stat cards to 83px each — a word
                           per line. Below 1024 the hero stacks instead. */
                        gridTemplateColumns: tab ? '1fr' : 'minmax(0, 1fr) minmax(0, 1.8fr)',
                        gap: tab ? '20px' : '40px', alignItems: 'start',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? '14px' : '20px' }}>
                            <h1
                                style={{
                                    fontFamily: "'Libre Baskerville',serif",
                                    color: ngo.dark,
                                    fontSize: tab ? '1.85rem' : '2.45rem',
                                    fontWeight: 700,
                                    lineHeight: 1.22,
                                    margin: 0,
                                    textShadow: '0 1px 8px rgba(255,255,255,0.4)',
                                    animation: 'ngo_in .6s ease-out both',
                                }}
                            >
                                We Build Digital Systems.
                                <br />
                                <span style={{ whiteSpace: tab ? 'normal' : 'nowrap' }}>
                                    That Help NGO's Raise Crores.
                                </span>
                            </h1>
                            <div style={{ animation: 'ngo_in .65s ease-out .08s both' }}><StatCards /></div>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.83rem' : '0.9rem', color: ngo.mid, lineHeight: 1.7, margin: 0, maxWidth: '52ch', textWrap: 'pretty', animation: 'ngo_in .7s ease-out .16s both' }}>From donation automation to structured compliance and scalable platforms. We build the infrastructure that connects their mission to millions.</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px', flexWrap: 'wrap', animation: 'ngo_in .75s ease-out .2s both' }}>
                                <Link to="/pages/NgoPage" className={`ngo-cta-btn${tab ? ' tab' : ''}`}>Explore NGO Ecosystem →</Link>
                                <Link to="/portfolio/ngo" className={`ngo-cta-btn${tab ? ' tab' : ''}`}>View Portfolio</Link>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? '11px' : '14px', alignItems: 'stretch', animation: 'ngo_in .65s ease-out .05s both' }}>
                            <NGOPersonCollage height={tab ? 380 : 430} radius={16} />
                            <PeopleBoxes />
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    // ─── SLIDE 1 E-COMMERCE ────────────────────────────────────────────────
    const renderEcomSlide = () => {
        const statBoxes = [
            { big: '700-800', label: 'Orders / Day', sub: 'Post-Optimization Growth' },
            { big: '225%+', label: 'Revenue Growth', sub: 'In 6 Months' },
            { big: '95+', label: 'E-Commerce Systems', sub: 'Shopify • WooCommerce • Custom' },
        ];
        const r1 = [{ name: '', icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/r17.webp' }, { name: '', icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ship1.webp' }, { name: '', icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shopify.svg' }, { name: '', icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/woo5.png' }, { name: '', icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/host3.webp' }, { name: '', icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/inter.webp' }, { name: '', icon: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/meta.webp' }];
        const lapMax = mob ? 230 : tab ? 380 : 500;
        const mobW = mob ? 72 : tab ? 120 : 150;

        return (
            <>
                <style>{`
                    @keyframes ec_in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
                    @keyframes ec_sr1{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
                    @keyframes ec_border{0%,100%{box-shadow:0 0 12px rgba(197,160,40,0.22)}50%{box-shadow:0 0 26px rgba(197,160,40,0.48)}}
                    .ec-t1{display:flex;width:max-content;animation:ec_sr1 22s linear infinite;will-change:transform;}
                    .ec-t1:hover{animation-play-state:paused;}
                    .ec-fl{-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 14%,#000 86%,transparent 100%);mask-image:linear-gradient(to right,transparent 0%,#000 14%,#000 86%,transparent 100%);}
                    .ec-sw{overflow:hidden;}
                    .ec-vm-btn{display:inline-flex;align-items:center;gap:6px;background:rgba(245,230,175,0.92);border:1.5px solid rgba(160,120,60,0.6);border-radius:30px;padding:0.52rem 1.7rem;color:#3D2B1F;font-family:'Libre Baskerville',serif;font-weight:700;font-size:0.88rem;cursor:pointer;text-decoration:none;white-space:nowrap;transition:transform 0.2s,box-shadow 0.2s;animation:ngo_pulse 3s ease-in-out infinite;}
                    .ec-vm-btn:hover{transform:translateY(-2px) scale(1.04);animation:none;}
                    .ec-vm-btn.mob{padding:0.44rem 1.4rem;font-size:0.78rem;}
                    .ec-vm-btn.tab{padding:0.48rem 1.55rem;font-size:0.82rem;}
                `}</style>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slide2.webp')", backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,4,1,0.54)', zIndex: 1 }} />

                {/* ── MOBILE E-COMMERCE ── */}
                {mob && (
                    <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', padding: `${slidePad.top}px ${slidePad.side}px ${slidePad.bot}px`, gap: 12, overflowX: 'hidden', boxSizing: 'border-box' }}>
                        <h1 style={{ fontFamily: "'Libre Baskerville',serif", color: ec.cream, fontSize: '1.36rem', fontWeight: 700, lineHeight: 1.18, margin: 0, textAlign: 'center', animation: 'ec_in .55s ease-out .04s both' }}>We Build Revenue Engines.</h1>
                        <div style={{ animation: 'ec_in .58s ease-out .06s both', paddingLeft: 8, paddingRight: 8 }}>
                            <BrandCards mob={mob} tab={tab} activeBrand={activeBrand} onBrandClick={handleBrandClick} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, animation: 'ec_in .5s ease-out both' }}>
                            <div style={{ flex: '0 0 auto', width: `calc(100% - ${mobW + 14}px)`, maxWidth: lapMax }}>
                                <CSSLaptop screenImages={laptopImgs} uid="ecom_m" maxWidth={lapMax} resetKey={brandKey} />
                            </div>
                            <div style={{ flex: `0 0 ${mobW}px`, width: mobW, marginBottom: 0, alignSelf: 'flex-end' }}>
                                <CSSPhoneMockup screenImages={mobileImgs} uid="ecph_m" maxWidth={mobW} resetKey={brandKey} />
                            </div>
                        </div>
                        <div className="hero-statline-mob" style={{ display: 'flex', flexDirection: 'column', gap: 3, animation: 'ec_in .6s ease-out .08s both' }}>
                            <p style={{ fontFamily: "'Inter',sans-serif", color: ec.creamDim, fontSize: '0.76rem', margin: 0, lineHeight: 1.58 }}>From 100 orders/day to <span style={{ color: ec.gold, fontWeight: 700 }}>700-800 orders/day.</span></p>
                            <p style={{ fontFamily: "'Inter',sans-serif", color: ec.creamDim, fontSize: '0.76rem', margin: 0, lineHeight: 1.58, fontWeight: 600 }}><span style={{ color: ec.gold, fontWeight: 700 }}>225%+</span> growth in just 6 months.</p>
                            <p style={{ fontFamily: "'Inter',sans-serif", color: ec.creamDim, fontSize: '0.76rem', margin: 0, lineHeight: 1.58, fontWeight: 600 }}><span style={{ color: ec.gold, fontWeight: 700 }}>25%</span> conversion improvement through seamless UX &amp; automation.</p>
                        </div>
                        <div style={{ display: 'flex', gap: 6, animation: 'ec_in .65s ease-out .1s both' }}>
                            {statBoxes.map((box, i) => (
                                <div key={`ecstat-${i}`} style={{ flex: '1 1 0', background: ec.boxBg, border: `2px solid ${ec.boxBorder}`, borderRadius: 9, padding: '9px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', gap: 3, animation: 'ec_border 4.5s ease-in-out infinite', minHeight: 80 }}>
                                    <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: '1.02rem', fontWeight: 800, color: ec.gold, lineHeight: 1 }}>{box.big}</span>
                                    <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: '0.55rem', fontWeight: 700, color: ec.cream, lineHeight: 1.22 }}>{box.label}</span>
                                    <div style={{ width: '55%', height: 1, background: 'rgba(197,160,40,0.28)', margin: '1px 0' }} />
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.47rem', color: ec.creamDim, lineHeight: 1.36 }}>{box.sub}</span>
                                </div>
                            ))}
                        </div>
                        <div className="hero-growth-mob" style={{ display: 'flex', flexDirection: 'column', gap: 4, animation: 'ec_in .7s ease-out .14s both' }}>
                            <div className="ec-sw ec-fl" style={{ width: '100%' }}><div className="ec-t1">{[...r1, ...r1].map((b, i) => (<div key={`r1m-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 16, flexShrink: 0 }}><img src={b.icon} alt={b.name} style={{ height: 28, opacity: 0.82, objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.74rem', color: ec.creamDim, fontWeight: 600, whiteSpace: 'nowrap' }}>{b.name}</span></div>))}</div></div>
                        </div>
                        <div className="hero-cta-mob" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px', animation: 'ec_in .59s ease-out .07s both', marginTop: 'auto' }}>
                            <Link to="/services/ecommerce" className="ec-vm-btn mob" style={{ flex: '1 1 0', textAlign: 'center' }}>View More →</Link>
                            <Link to="/portfolio/ecommerce" className="ec-vm-btn mob" style={{ flex: '1 1 0', textAlign: 'center' }}>Portfolio</Link>
                        </div>
                    </div>
                )}

                {/* ── DESKTOP/TAB E-COMMERCE ── */}
                {!mob && (
                    <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: `${slidePad.top}px ${slidePad.side}px ${slidePad.bot}px`, boxSizing: 'border-box', marginTop: "35px" }}>
                        <div style={{ width: '100%', maxWidth: 1340, display: 'grid', gridTemplateColumns: '50% 50%', gap: tab ? 18 : 30, alignItems: 'start' }}>
                            {/* LEFT COLUMN */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? 9 : 12 }}>
                                <h1 style={{ fontFamily: "'Libre Baskerville',serif", color: ec.cream, fontSize: tab ? '1.75rem' : '2.32rem', fontWeight: 700, lineHeight: 1.16, margin: 0, animation: 'ec_in .5s ease-out both', paddingTop: mob ? '10px' : tab ? '45px' : '65px' }}>We Don't Build Stores.<br />We Build Revenue Engines.</h1>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, animation: 'ec_in .55s ease-out .04s both' }}>
                                    <p style={{ fontFamily: "'Inter',sans-serif", color: ec.creamDim, fontSize: tab ? '0.78rem' : '0.86rem', margin: 0, lineHeight: 1.58 }}>From 100 orders/day to <span style={{ color: ec.gold, fontWeight: 700 }}>700-800 orders/day.</span></p>
                                    <p style={{ fontFamily: "'Inter',sans-serif", color: ec.creamDim, fontSize: tab ? '0.78rem' : '0.86rem', margin: 0, lineHeight: 1.58, fontWeight: 600 }}><span style={{ color: ec.gold, fontWeight: 700 }}>225%</span> growth in just 6 months.</p>
                                    <p style={{ fontFamily: "'Inter',sans-serif", color: ec.creamDim, fontSize: tab ? '0.78rem' : '0.86rem', margin: 0, lineHeight: 1.58, fontWeight: 600 }}><span style={{ color: ec.gold, fontWeight: 700 }}>25%</span> conversion improvement through seamless UX &amp; automation.</p>
                                </div>
                                <div style={{ display: 'flex', gap: tab ? 8 : 11, animation: 'ec_in .6s ease-out .08s both' }}>
                                    {statBoxes.map((box, i) => (
                                        <div key={`ecstatd-${i}`} style={{ flex: '1 1 0', background: ec.boxBg, border: `2px solid ${ec.boxBorder}`, borderRadius: tab ? 9 : 12, minHeight: tab ? 98 : 114, padding: tab ? '11px 7px' : '14px 9px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', gap: tab ? 3 : 5, animation: 'ec_border 4.5s ease-in-out infinite' }}>
                                            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: tab ? '1.26rem' : '1.65rem', fontWeight: 800, color: ec.gold, lineHeight: 1 }}>{box.big}</span>
                                            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: tab ? '0.62rem' : '0.7rem', fontWeight: 700, color: ec.cream, lineHeight: 1.22 }}>{box.label}</span>
                                            <div style={{ width: '55%', height: 1, background: 'rgba(197,160,40,0.28)', margin: '1px 0' }} />
                                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.53rem' : '0.59rem', color: ec.creamDim, lineHeight: 1.36 }}>{box.sub}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? 3 : 5, animation: 'ec_in .65s ease-out .12s both' }}>
                                    <div className="ec-sw ec-fl"><div className="ec-t1">{[...r1, ...r1].map((b, i) => (<div key={`r1d-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 7, marginRight: 24, flexShrink: 0 }}><img src={b.icon} alt={b.name} style={{ height: tab ? 36 : 46, opacity: 0.85, objectFit: 'contain', transform: b.name === 'Razorpay' ? 'scale(1.25)' : 'none' }} onError={e => e.target.style.display = 'none'} /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.72rem', color: ec.creamDim, fontWeight: 600, whiteSpace: 'nowrap' }}>{b.name}</span></div>))}</div></div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, animation: 'ec_in .72s ease-out .17s both' }}>
                                    <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: tab ? '0.96rem' : '1.05rem', color: ec.cream, fontWeight: 700, margin: 0 }}>Complete E-Commerce Infrastructure.</p>
                                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.74rem' : '0.82rem', color: ec.creamDim, margin: 0 }}>From Code to Conversion to Courier.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'ec_in .78s ease-out .22s both', marginTop: 'auto', paddingTop: tab ? 8 : 14 }}>
                                    <Link to="/services/ecommerce" className={`ec-vm-btn${tab ? ' tab' : ''}`}>View More <span style={{ fontSize: '0.85em' }}>→</span></Link>
                                    <Link to="/portfolio/ecommerce" className={`ec-vm-btn${tab ? ' tab' : ''}`}>View Portfolio</Link>
                                </div>
                            </div>

                            {/* RIGHT COLUMN BrandCards 2x2 on top, then devices below */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? 11 : 14, alignItems: 'stretch', animation: 'ec_in .58s ease-out .06s both', paddingTop: mob ? '10px' : tab ? '45px' : '65px' }}>
                                {/* 2x2 brand cards grid */}
                                <BrandCards mob={mob} tab={tab} activeBrand={activeBrand} onBrandClick={handleBrandClick} />
                                {/* Laptop + phone mockups below brand cards */}
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', gap: tab ? 4 : 6 }}>
                                    <div style={{ flex: 1, maxWidth: lapMax }}>
                                        <CSSLaptop screenImages={laptopImgs} uid="ecom_d" maxWidth={lapMax} resetKey={brandKey} />
                                    </div>
                                    <div style={{ width: mobW, flexShrink: 0, marginBottom: tab ? 18 : 24 }}>
                                        <CSSPhoneMockup screenImages={mobileImgs} uid="ecph_d" maxWidth={mobW} resetKey={brandKey} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    // ─── SLIDE 2 INFRASTRUCTURE ────────────────────────────────────────────
    const renderInfraSlide = () => {
        const cards = [
            { icon: '🤝', title: 'NGO Digital Systems', items: ['Donation Infrastructure', 'Crowdfunding Platforms', 'Compliance Automation', '400+ Websites Engineered'] },
            { icon: '📊', title: 'Real Estate Growth Systems', items: ['CRM + Mobile Apps', '₹5Cr+ Ad Spend Managed', '110+ Homes Sold Annually', 'Lead Automation Architecture'] },
            { icon: '🛒', title: 'E-Commerce Ecosystem', items: ['100+ Stores Built', 'Shopify / WooCommerce / Custom', 'Logistics + Payment Automation', '225% Growth Observed'] },
        ];
        const partners = [{ src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/razorpay.png', name: 'Razorpay' }, { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shiprocket.webp', name: 'Shiprocket' }, { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shopify.png', name: 'Shopify' }, { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/woocomm.png', name: 'WooCommerce' }, { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/interakt.png', name: 'Interakt' }];
        const rightIcons = [{ src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/meta.jpg', label: 'Meta' }, { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shopify.png', label: 'Shopify' }, { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/woocomm.png', label: 'WooCommerce' }, { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/interakt.png', label: 'Interakt' }];
        const lapMax = mob ? 280 : tab ? 380 : 500;
        const panelW = mob ? 0 : tab ? 138 : 176;
        const panelImgH = mob ? 0 : tab ? 110 : 140;

        return (
            <>
                <style>{`
                    @keyframes ifIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
                    @keyframes ifCard{0%,100%{box-shadow:0 4px 24px rgba(0,0,0,0.3);}50%{box-shadow:0 6px 32px rgba(0,0,0,0.44);}}
                    @keyframes ifPs{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
                    .if-pt{display:flex;width:max-content;gap:24px;align-items:center;animation:ifPs 18s linear infinite;will-change:transform;}
                    .if-pt:hover{animation-play-state:paused;}
                    .if-po{overflow:hidden;position:relative;}
                    .if-po::before,.if-po::after{content:'';position:absolute;top:0;bottom:0;width:22px;z-index:2;pointer-events:none;}
                    .if-po::before{left:0;background:linear-gradient(to right,rgba(5,13,26,0.95),transparent);}
                    .if-po::after{right:0;background:linear-gradient(to left,rgba(5,13,26,0.95),transparent);}
                `}</style>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/slider3.webp')", backgroundSize: 'cover', backgroundPosition: 'center top', zIndex: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(5,13,26,0.55) 0%,rgba(5,13,26,0.28) 25%,rgba(5,13,26,0.58) 62%,rgba(5,13,26,0.97) 100%)', zIndex: 1 }} />

                <div style={{ position: 'relative', zIndex: 2, width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: slidePad.top, paddingBottom: slidePad.bot, paddingLeft: slidePad.side, paddingRight: slidePad.side, gap: mob ? 10 : tab ? 12 : 14, boxSizing: 'border-box', overflowX: 'hidden', overflowY: desk ? 'hidden' : 'auto' }}>
                    <div style={{ textAlign: 'center', animation: 'ifIn .5s ease-out both', width: '100%', flexShrink: 0 }}>
                        <h1 style={{ fontFamily: "'Libre Baskerville',serif", color: '#fff', fontSize: mob ? '1.52rem' : tab ? '1.96rem' : '2.52rem', fontWeight: 700, lineHeight: 1.2, textShadow: '0 2px 24px rgba(0,0,0,0.7)', margin: 0 }}>We Build Digital Infrastructure.<br />Across Industries.</h1>
                        <p style={{ fontFamily: "'Inter',sans-serif", color: 'rgba(255,255,255,0.78)', fontSize: mob ? '0.82rem' : tab ? '0.9rem' : '1.02rem', lineHeight: 1.6, marginTop: mob ? 6 : 10, fontWeight: 400 }}>From NGOs to Real Estate to E-Commerce We Architect Scalable Growth Systems.</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: mob ? 10 : tab ? 12 : 16, width: '100%', flexShrink: 0, animation: 'ifIn .58s ease-out .07s both' }}>
                        {!mob && (<div style={{ flexShrink: 0, width: panelW, background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(200,215,240,0.38)', borderRadius: 14, backdropFilter: 'blur(10px)', padding: tab ? '12px 10px' : '15px 13px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1 }}>
                            <div style={{ width: '100%', height: panelImgH, borderRadius: 9, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}><img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngo.webp" alt="NGO" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} /></div>
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.7rem' : '0.76rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 1.4 }}>🤝 NGO Digital Systems</span>
                        </div>)}
                        {!mob && <div style={{ width: tab ? 12 : 18, height: 2, flexShrink: 0, background: 'linear-gradient(90deg,rgba(200,210,230,0.08),rgba(200,210,230,0.5),rgba(200,210,230,0.08))' }} />}
                        <div style={{ flex: mob ? undefined : 1, width: mob ? '100%' : undefined, maxWidth: lapMax, zIndex: 3 }}>
                            <CSSLaptop screenImages={['https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/realestate.webp']} uid="infra" maxWidth={lapMax} />
                        </div>
                        {!mob && <div style={{ width: tab ? 12 : 18, height: 2, flexShrink: 0, background: 'linear-gradient(90deg,rgba(200,210,230,0.08),rgba(200,210,230,0.5),rgba(200,210,230,0.08))' }} />}
                        {!mob && (<div style={{ flexShrink: 0, width: panelW, background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(200,215,240,0.38)', borderRadius: 14, backdropFilter: 'blur(10px)', padding: tab ? '12px 10px' : '15px 13px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1 }}>
                            <div style={{ width: '100%', height: panelImgH, borderRadius: 9, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}><img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ecommbgnd.webp" alt="E-Commerce" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} /></div>
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.7rem' : '0.76rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 1.4 }}>🛒 E-Commerce Ecosystem</span>
                        </div>)}
                        {mob && (<div style={{ display: 'flex', gap: 8, width: '100%' }}>
                            {[{ src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ngo.webp', label: '🤝 NGO Digital Systems' }, { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/ecommbgnd.webp', label: '🛒 E-Commerce Ecosystem' }].map((p, i) => (
                                <div key={`ifpanel-${i}`} style={{ flex: '1 1 0', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(200,215,240,0.38)', borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 44, height: 38, borderRadius: 7, overflow: 'hidden', flexShrink: 0 }}><img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} /></div>
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.63rem', fontWeight: 600, color: 'rgba(255,255,255,0.88)', lineHeight: 1.35 }}>{p.label}</span>
                                </div>
                            ))}
                        </div>)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 8 : tab ? 10 : 12, width: '100%', animation: 'ifIn .63s ease-out .14s both', flexShrink: 0 }}>
                        {cards.map((card, i) => (
                            <div key={`ifcard-${i}`} style={{ flex: '1 1 0', background: 'rgba(255,255,255,0.058)', border: '1.5px solid rgba(200,210,230,0.19)', borderRadius: 13, backdropFilter: 'blur(10px)', padding: mob ? '10px 12px' : tab ? '11px 10px' : '12px 13px', display: 'flex', flexDirection: 'column', gap: 4, animation: 'ifCard 5s ease-in-out infinite', transition: 'transform .3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
                                <h3 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: mob ? '0.86rem' : tab ? '0.88rem' : '0.94rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 6, marginBottom: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}><span>{card.icon}</span>{card.title}</h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {card.items.map((item, j) => (<li key={j} style={{ fontFamily: "'Inter',sans-serif", fontSize: mob ? '0.74rem' : tab ? '0.75rem' : '0.8rem', color: 'rgba(255,255,255,0.74)', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start' }}><span style={{ color: 'rgba(197,160,40,0.82)', marginRight: 6, flexShrink: 0, fontSize: '0.75em', lineHeight: '1.7' }}>•</span>{item}</li>))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: 'stretch', gap: mob ? 8 : tab ? 16 : 24, width: '100%', animation: 'ifIn .68s ease-out .2s both', flexShrink: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0, justifyContent: 'center' }}>
                            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: mob ? '0.68rem' : '0.76rem', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}>Official Integration Partners:</span>
                            <div className="if-po" style={{ width: mob ? 'min(80vw,290px)' : tab ? 200 : 250 }}>
                                <div className="if-pt">
                                    {[...partners, ...partners].map((p, i) => (<div key={`ifpt-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}><img src={p.src} alt={p.name} style={{ height: mob ? 16 : 18, objectFit: 'contain', opacity: 0.76, flexShrink: 0 }} onError={e => e.target.style.display = 'none'} /></div>))}
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: mob ? 'flex-start' : 'center' }}>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: mob ? '0.74rem' : tab ? '0.78rem' : '0.86rem', color: 'rgba(255,255,255,0.56)', lineHeight: 1.65, margin: 0 }}>Serving <strong style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 700 }}>50L 3Cr</strong> Revenue Businesses<br />Trusted by Industry Leaders Across India</p>
                        </div>
                        <div style={{ display: 'flex', gap: tab ? 14 : 18, alignItems: 'center', flexShrink: 0, alignSelf: 'stretch', justifyContent: 'flex-end' }}>
                            <div style={{ display: 'flex', gap: tab ? 14 : 18, alignItems: 'center', background: 'rgba(255,255,255,0.055)', border: '1.5px solid rgba(200,210,230,0.19)', borderRadius: 13, backdropFilter: 'blur(10px)', padding: tab ? '8px 16px' : '10px 20px', minWidth: tab ? 180 : 220 }}>
                                {rightIcons.map((ic, i) => (
                                    <React.Fragment key={`ric-${i}`}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                            <img src={ic.src} alt={ic.label} style={{ height: mob ? 18 : tab ? 20 : 24, objectFit: 'contain', opacity: 0.74 }} onError={e => e.target.style.display = 'none'} />
                                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.5rem', color: 'rgba(255,255,255,0.36)', textAlign: 'center' }}>{ic.label}</span>
                                        </div>
                                        {i < rightIcons.length - 1 && <div style={{ width: 1, height: mob ? 18 : 22, background: 'rgba(200,210,230,0.18)', flexShrink: 0 }} />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    // ─── SLIDE 3 LOGISTICS ─────────────────────────────────────────────────
    const renderLogisticsSlide = () => {
        const processSteps = [
            { img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/imgone.webp', title: 'Vendor /\nBrand Owner', sub: 'Upload Products' },
            { img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/process2.webp', title: 'E-Commerce\nPlatform', sub: 'Orders Collected' },
            { img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/trial3rd.webp', title: 'Payment\nGateway', sub: 'Payments Secured' },
            { img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/van.webp', title: 'Shiprocket\nLogistics', sub: 'Auto Pickup & Dispatch' },
            { img: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/download.webp', title: 'Customer', sub: 'Delivered Successfully.' },
        ];

        const partnerIcons = [
            { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/razorpay.webp', label: 'Razorpay' },
            { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shopify.svg', label: 'Shopify' },
            { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/interakt.png', label: 'Interakt' },
            { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/woocomm.png', label: 'WooCommerce' },
            { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/shiprocket.webp', label: 'Shiprocket' },
            { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/meta.jpg', label: 'Meta' },
            { src: 'https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/hostinger.png', label: 'Hostinger' },
        ];

        const logisticsBtnStyle = (isMob, isTab) => ({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            border: '1.5px solid rgba(80,200,255,0.55)',
            borderRadius: '30px',
            padding: isMob ? '0.52rem 1.8rem' : isTab ? '0.58rem 1.9rem' : '0.66rem 2.3rem',
            color: '#00008B',
            fontFamily: "'Libre Baskerville',serif",
            fontWeight: 700,
            fontSize: isMob ? '0.82rem' : isTab ? '0.86rem' : '0.92rem',
            cursor: 'pointer',
            letterSpacing: '0.3px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'transform 0.2s',
            flexShrink: 0,
        });

        return (
            <>
                <style>{`
                    @keyframes lineGlow{0%,100%{filter:drop-shadow(0 0 2px rgba(80,200,255,0.5));opacity:0.7;}50%{filter:drop-shadow(0 0 8px rgba(80,200,255,1)) drop-shadow(0 0 14px rgba(0,150,255,0.8));opacity:1;}}
                    @keyframes log_in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
                    @keyframes log_glow{0%,100%{filter:drop-shadow(0 0 6px rgba(80,200,255,0.4))}50%{filter:drop-shadow(0 0 18px rgba(80,200,255,0.85)) drop-shadow(0 0 32px rgba(0,102,255,0.45))}}
                    @keyframes log_flow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
                    @keyframes iconScroll{0%{transform:translateX(0%)}100%{transform:translateX(-50%)}}
                    @keyframes chevBlink0{0%,100%{opacity:0.2}20%,35%{opacity:1;filter:drop-shadow(0 0 6px rgba(80,200,255,1))}}
                    @keyframes chevBlink1{0%,100%{opacity:0.2}40%,55%{opacity:1;filter:drop-shadow(0 0 6px rgba(80,200,255,1))}}
                    @keyframes chevBlink2{0%,100%{opacity:0.2}60%,75%{opacity:1;filter:drop-shadow(0 0 6px rgba(80,200,255,1))}}
                    @keyframes chevBlink3{0%,100%{opacity:0.2}70%,85%{opacity:1;filter:drop-shadow(0 0 6px rgba(80,200,255,1))}}
                    @keyframes arrBlink0{0%,80%,100%{opacity:0.3;filter:none}10%,30%{opacity:1;filter:drop-shadow(0 0 6px rgba(80,200,255,1)) drop-shadow(0 0 10px rgba(0,150,255,0.7))}}
                    @keyframes arrBlink1{0%,100%{opacity:0.3;filter:none}25%,45%{opacity:1;filter:drop-shadow(0 0 6px rgba(80,200,255,1)) drop-shadow(0 0 10px rgba(0,150,255,0.7))}}
                    @keyframes arrBlink2{0%,100%{opacity:0.3;filter:none}40%,60%{opacity:1;filter:drop-shadow(0 0 6px rgba(80,200,255,1)) drop-shadow(0 0 10px rgba(0,150,255,0.7))}}
                    @keyframes arrBlink3{0%,100%{opacity:0.3;filter:none}55%,75%{opacity:1;filter:drop-shadow(0 0 6px rgba(80,200,255,1)) drop-shadow(0 0 10px rgba(0,150,255,0.7))}}
                    @keyframes sparkle{0%,100%{opacity:0;transform:scale(0.4) rotate(0deg)}50%{opacity:1;transform:scale(1.1) rotate(180deg)}}
                    .log-line{background:linear-gradient(90deg,rgba(10,46,82,0.1),rgba(0,102,255,0.7),rgba(80,200,255,0.95),rgba(0,102,255,0.7),rgba(10,46,82,0.1));background-size:200% auto;animation:log_flow 2.8s linear infinite;}
                    .log-container{background:rgba(8,18,40,0.55);border:1px solid rgba(80,200,255,0.18);outline:none;box-shadow:none;backdrop-filter:blur(10px) saturate(160%);-webkit-backdrop-filter:blur(10px) saturate(160%);border-radius:14px;}
                    @keyframes partnerScroll{0%{transform:translateX(0%)}100%{transform:translateX(-50%)}}
                    .partner-bar-track{display:flex;width:max-content;animation:partnerScroll 16s linear infinite;align-items:center;will-change:transform;}
                    .partner-bar-track:hover{animation-play-state:paused;}
                    .partner-bar-wrap{overflow:hidden;border-radius:0;position:relative;background:#ffffff;border:none!important;outline:none!important;box-shadow:none!important;-webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,0.05) 6%,rgba(0,0,0,0.55) 16%,rgba(0,0,0,1) 32%,rgba(0,0,0,1) 100%);mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,0.05) 6%,rgba(0,0,0,0.55) 16%,rgba(0,0,0,1) 32%,rgba(0,0,0,1) 100%);}
                    .partner-bar-inner{display:contents;}
                    .partner-bar-fade-left{display:none;}
                    .partner-bar-fade-right{display:none;}
                `}</style>

                <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/logistics-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(5,10,25,0.62) 0%,rgba(5,10,25,0.4) 40%,rgba(5,10,25,0.75) 100%)', zIndex: 1 }} />

                {/* ── MOBILE LOGISTICS ── */}
                {mob && (
                    <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', padding: `${slidePad.top}px ${slidePad.side}px ${slidePad.bot}px`, gap: 0, boxSizing: 'border-box', overflowX: 'hidden' }}>
                        <div style={{ textAlign: 'center', animation: 'log_in .5s ease-out both', marginBottom: 12 }}>
                            <h1 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: mob ? '1.42rem' : '1.72rem', fontWeight: 700, lineHeight: 1.15, margin: 0 }}>
                                <span style={{ color: '#fff', display: 'block' }}>Sell Online.</span>
                                <span style={{ color: '#50C8FF', display: 'block' }}>We Handle Everything.</span>
                            </h1>
                            <p style={{ marginTop: 8, fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, margin: '8px 0 0' }}>
                                From Product ⇒ Payment ⇒ Delivery ⇒ Profit.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 6, animation: 'log_in .55s ease-out .04s both', marginBottom: 14 }}>
                            {[{ big: '700-800', label: 'Orders / Day' }, { big: '225%+', label: 'Growth' }, { big: '100+', label: 'Stores Built' }].map((s, i) => (
                                <div key={`lgs-${i}`} className="log-container" style={{ flex: '1 1 0', padding: '9px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                                    <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: '0.98rem', fontWeight: 800, color: '#50C8FF', lineHeight: 1 }}>{s.big}</span>
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.52rem', fontWeight: 600, color: 'rgba(255,255,255,0.78)', lineHeight: 1.3 }}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 2px 0' }}>
                            <svg width="18" height="36" viewBox="0 0 18 36" style={{ filter: 'drop-shadow(0 0 6px rgba(80,200,255,0.95))', display: 'block' }}>
                                <path d="M 9 0 L 9 24" stroke="rgba(0,50,140,0.55)" strokeWidth={9} fill="none" strokeLinecap="round" />
                                <path d="M 9 0 L 9 24" stroke="rgba(0,120,255,0.55)" strokeWidth={4.5} fill="none" strokeLinecap="round" />
                                <path d="M 9 0 L 9 24" stroke="#50C8FF" strokeWidth={2} fill="none" strokeLinecap="round" />
                                <path d="M 9 0 L 9 24" stroke="rgba(200,240,255,0.8)" strokeWidth={0.6} fill="none" strokeLinecap="round" />
                                <path d="M 2 22 L 9 33 L 16 22" stroke="rgba(0,50,140,0.55)" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 2 22 L 9 33 L 16 22" stroke="rgba(0,120,255,0.55)" strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 2 22 L 9 33 L 16 22" stroke="#50C8FF" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'log_in .6s ease-out .08s both' }}>
                            {processSteps.map((step, i) => (
                                <React.Fragment key={`lgstep-${i}`}>
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: mob ? 8 : 12, padding: mob ? '0 4px 0 6px' : '2px 4px 2px 8px' }}>
                                        <div style={{ flexShrink: 0, width: mob ? (veryShortVh ? 26 : shortVh ? 34 : 46) : 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={step.img} alt={step.title.replace('\n', ' ')} style={{ width: mob ? (veryShortVh ? 26 : shortVh ? 34 : 46) : 80, height: mob ? (veryShortVh ? 26 : shortVh ? 34 : 46) : 80, objectFit: 'contain', filter: 'drop-shadow(0 4px 14px rgba(80,200,255,0.4))', animation: 'log_glow 4s ease-in-out infinite', animationDelay: `${i * 0.4}s`, display: 'block' }} onError={e => e.target.style.display = 'none'} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: mob ? '0.84rem' : '1.02rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.18 }}>{step.title.replace('\n', ' ')}</p>
                                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: mob ? '0.6rem' : '0.66rem', color: 'rgba(255,255,255,0.58)', margin: mob ? '1px 0 0' : '3px 0 0', lineHeight: 1.25, fontWeight: 500 }}>{step.sub}</p>
                                        </div>
                                    </div>
                                    {i < processSteps.length - 1 && (
                                        <div style={{ display: 'flex', justifyContent: 'center', margin: mob ? '0' : '2px 0' }}>
                                            <svg width={mob ? 13 : 18} height={mob ? (veryShortVh ? 5 : shortVh ? 8 : 17) : 28} viewBox="0 0 18 28" style={{ filter: 'drop-shadow(0 0 6px rgba(80,200,255,0.95))', display: 'block' }}>
                                                <path d="M 9 0 L 9 18" stroke="rgba(0,50,140,0.55)" strokeWidth={9} fill="none" strokeLinecap="round" />
                                                <path d="M 9 0 L 9 18" stroke="rgba(0,120,255,0.55)" strokeWidth={4.5} fill="none" strokeLinecap="round" />
                                                <path d="M 9 0 L 9 18" stroke="#50C8FF" strokeWidth={2} fill="none" strokeLinecap="round" />
                                                <path d="M 9 0 L 9 18" stroke="rgba(200,240,255,0.8)" strokeWidth={0.6} fill="none" strokeLinecap="round" />
                                                <path d="M 2 16 L 9 26 L 16 16" stroke="rgba(0,50,140,0.55)" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M 2 16 L 9 26 L 16 16" stroke="rgba(0,120,255,0.55)" strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M 2 16 L 9 26 L 16 16" stroke="#50C8FF" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="hero-growth-mob" style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 6, animation: 'log_in .8s ease-out .2s both' }}>
                            <div style={{ flex: '1 1 0', position: 'relative', minWidth: 0, marginLeft: 28 }}>
                                <div className="partner-bar-wrap">
                                    <div className="partner-bar-inner" style={{ padding: mob ? '4px 0' : '10px 0', overflow: 'hidden' }}>
                                        <div className="partner-bar-track">
                                            {[...Array(3)].map((_, dupI) => (
                                                <React.Fragment key={dupI}>
                                                    {partnerIcons.map((ic, idx) => (
                                                        <div key={`${dupI}-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', flexShrink: 0 }}>
                                                            <img src={ic.src} alt={ic.label} style={{ height: 17, objectFit: 'contain', opacity: 1, filter: 'none', transform: ic.label === 'Razorpay' ? 'scale(1.25)' : 'none' }} onError={e => e.target.style.display = 'none'} />
                                                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.58rem', color: '#1a1a2e', fontWeight: 600, whiteSpace: 'nowrap' }}>{ic.label}</span>
                                                            <div style={{ width: 1, height: 13, background: 'rgba(0,0,0,0.15)', marginLeft: 5, flexShrink: 0 }} />
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flexShrink: 0, width: '40%' }}>
                                <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/maingraph.webp" alt="Revenue graph" style={{ width: '100%', maxHeight: 85, objectFit: 'contain', objectPosition: 'right bottom', filter: 'drop-shadow(0 4px 20px rgba(80,200,255,0.5))', animation: 'log_glow 4s ease-in-out infinite', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                            </div>
                        </div>
                        <div className="hero-cta-mob" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px', marginTop: 14, animation: 'log_in .56s ease-out .05s both' }}>
                            <Link
                                to="/services/ecommerce"
                                style={{ ...logisticsBtnStyle(mob, tab), flex: '1 1 0', textAlign: 'center' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                            >
                                View More →
                            </Link>
                            <Link
                                to="/portfolio/logistics"
                                style={{ ...logisticsBtnStyle(mob, tab), flex: '1 1 0', textAlign: 'center' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                            >
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                )}

                {/* ── DESKTOP/TAB LOGISTICS ── */}
                {!mob && (
                    <div style={{ position: 'relative', zIndex: 2, width: '90%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: slidePad.top, paddingBottom: slidePad.bot, paddingLeft: slidePad.side, paddingRight: slidePad.side, boxSizing: 'border-box', overflow: 'hidden', marginTop: "90px" }}>
                        <div style={{ width: '100%', maxWidth: 1340, display: 'flex', flexDirection: 'column', gap: 0, height: '100%', justifyContent: 'flex-start' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: tab ? 10 : 18, alignItems: 'start', animation: 'log_in .5s ease-out both', marginBottom: tab ? 3 : 5, marginTop: 0, flexShrink: 0 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: tab ? 6 : 10, paddingTop: tab ? 6 : 10 }}>
                                    <h1 style={{ fontFamily: "'Libre Baskerville',serif", fontSize: tab ? '1.95rem' : '2.75rem', fontWeight: 700, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
                                        <span style={{ color: '#fff', display: 'block' }}>Turn Products Into</span>
                                        <span style={{ color: '#50C8FF', display: 'block' }}>Scalable Revenue.</span>
                                    </h1>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? 3 : 5 }}>
                                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.8rem' : '0.9rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.38, fontWeight: 500, margin: 0 }}>From <strong style={{ color: '#fff', fontWeight: 700 }}>100</strong> orders/day to <span style={{ color: '#50C8FF', fontWeight: 700 }}>700-800/day.</span></p>
                                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.8rem' : '0.9rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.38, fontWeight: 500, margin: 0 }}><span style={{ color: '#50C8FF', fontWeight: 700 }}>225%+</span> growth in 6 months.</p>
                                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.8rem' : '0.9rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.38, fontWeight: 500, margin: 0 }}>Fully automated. Fully integrated.</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'nowrap', animation: 'log_in .56s ease-out .05s both' }}>
                                        <Link
                                            to="/services/ecommerce"
                                            style={logisticsBtnStyle(mob, tab)}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                                        >
                                            View More →
                                        </Link>
                                        <Link
                                            to="/portfolio/ecommerce"
                                            style={logisticsBtnStyle(mob, tab)}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                                        >
                                            View Portfolio
                                        </Link>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', gap: tab ? 8 : 12, animation: 'log_in .52s ease-out .04s both', paddingRight: 0 }}>
                                    <div style={{ position: 'relative', width: tab ? '58%' : '56%', marginRight: tab ? 10 : 18 }}>
                                        <img src="https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/maingraph.webp" alt="Revenue graph" style={{ width: '100%', maxHeight: tab ? 115 : 165, objectFit: 'contain', objectPosition: 'right top', filter: 'drop-shadow(0 6px 30px rgba(80,200,255,0.45))', animation: 'log_glow 4s ease-in-out infinite', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                                    </div>
                                    <div style={{ width: '100%', alignSelf: 'flex-start', display: 'flex', justifyContent: 'flex-end', animation: 'log_in .56s ease-out .06s both', paddingRight: tab ? 59 : 60 }}>
                                        <div className="partner-bar-wrap" style={{ width: tab ? '58%' : '55%' }}>
                                            <div className="partner-bar-inner" style={{ padding: tab ? '20px 0' : '30px 0', overflow: 'hidden' }}>
                                                <div className="partner-bar-track">
                                                    {[...partnerIcons, ...partnerIcons].map((ic, idx) => (
                                                        <div key={`pbd-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: tab ? 7 : 10, padding: tab ? '0 18px' : '0 22px', flexShrink: 0 }}>
                                                            <img src={ic.src} alt={ic.label} style={{ height: tab ? 34 : 44, width: 'auto', objectFit: 'contain', opacity: 1, filter: 'none', flexShrink: 0, transform: ic.label === 'Razorpay' ? 'scale(1.25)' : 'none' }} onError={e => e.target.style.display = 'none'} />
                                                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.72rem' : '0.82rem', color: '#1a1a2e', fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '0.2px' }}>{ic.label}</span>
                                                            <div style={{ width: 1, height: tab ? 20 : 26, background: 'rgba(0,0,0,0.13)', marginLeft: tab ? 4 : 5, flexShrink: 0 }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'stretch', gap: tab ? 4 : 6, animation: 'log_in .6s ease-out .08s both', marginBottom: tab ? 3 : 4, marginTop: tab ? 8 : 12, flexShrink: 0, width: '100%', marginLeft: tab ? -28 : -40 }}>
                                <div className="log-container" style={{ flex: '1 1 0', padding: tab ? '8px 8px' : '10px 12px', minHeight: tab ? 52 : 64, display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: tab ? 4 : 8, flex: 1, alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: tab ? '1.05rem' : '1.35rem', fontWeight: 800, color: '#50C8FF', lineHeight: 1, display: 'block' }}>700-800</span>
                                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.65rem' : '0.75rem', color: '#fff', fontWeight: 600, margin: '4px 0 0', lineHeight: 1.3 }}>Orders / Day</p>
                                        </div>
                                        <div style={{ width: 1, background: 'rgba(80,200,255,0.4)', alignSelf: 'stretch', flexShrink: 0 }} />
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: tab ? '1.05rem' : '1.35rem', fontWeight: 800, color: '#50C8FF', lineHeight: 1, display: 'block' }}>225%+</span>
                                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.65rem' : '0.75rem', color: '#fff', fontWeight: 600, margin: '4px 0 0', lineHeight: 1.3 }}>Orders Collected</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: tab ? 18 : 22 }}>
                                    <svg width={tab ? 11 : 14} height={tab ? 16 : 20} viewBox="0 0 14 20" style={{ animation: 'chevBlink0 1.6s ease-in-out infinite', filter: 'drop-shadow(0 0 4px rgba(80,200,255,0.9))' }}>
                                        <path d="M 2 1 L 12 10 L 2 19" stroke="#50C8FF" strokeWidth={2.5} fill="none" strokeLinecap="square" strokeLinejoin="miter" />
                                    </svg>
                                </div>

                                <div className="log-container" style={{ flex: '1 1 0', padding: tab ? '8px 12px' : '10px 14px', minHeight: tab ? 52 : 64, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                    <MidCarousel tab={tab} mob={mob} />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: tab ? 18 : 22 }}>
                                    <svg width={tab ? 11 : 14} height={tab ? 16 : 20} viewBox="0 0 14 20" style={{ animation: 'chevBlink1 1.6s ease-in-out 0.55s infinite', filter: 'drop-shadow(0 0 4px rgba(80,200,255,0.9))' }}>
                                        <path d="M 2 1 L 12 10 L 2 19" stroke="#50C8FF" strokeWidth={2.5} fill="none" strokeLinecap="square" strokeLinejoin="miter" />
                                    </svg>
                                </div>

                                <div className="log-container" style={{ flex: '1 1 0', padding: tab ? '8px 12px' : '10px 14px', minHeight: tab ? 52 : 64, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                    <LastCarousel tab={tab} mob={mob} />
                                </div>
                            </div>

                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <svg width="100%" height="0" viewBox="0 0 1340 0" preserveAspectRatio="none" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', filter: 'drop-shadow(0 0 6px rgba(80,200,255,0.9))', zIndex: 10 }}>
                                    {[{ x: 140 }, { x: 300 }, { x: 637 }, { x: 1069 }].map(({ x }, i) => (
                                        [{ s: 'rgba(0,40,100,0.5)', w: 8 }, { s: 'rgba(0,110,255,0.42)', w: 4 }, { s: '#50C8FF', w: 1.6 }, { s: 'rgba(210,245,255,0.8)', w: 0.5 }].map((l, li) => (
                                            <path key={`s${i}${li}`} d={`M ${x} -14 L ${x} 0`} stroke={l.s} strokeWidth={l.w} fill="none" strokeLinecap="round" />
                                        ))
                                    ))}
                                </svg>
                                <div style={{ position: 'relative', width: '100%', height: tab ? 40 : 52, flexShrink: 0, marginTop: tab ? 1 : 2 }}>
                                    <svg width="100%" height="100%" viewBox="0 0 1340 72" preserveAspectRatio="none" style={{ overflow: 'visible', display: 'block' }}>
                                        <defs>
                                            <linearGradient id="hlG22a" gradientUnits="userSpaceOnUse" x1="200" y1="72" x2="268" y2="72">
                                                <stop offset="0%" stopColor="#071230" />
                                                <stop offset="50%" stopColor="#0d3a8a" />
                                                <stop offset="100%" stopColor="#50C8FF" />
                                            </linearGradient>
                                            <linearGradient id="hlG07a" gradientUnits="userSpaceOnUse" x1="200" y1="72" x2="268" y2="72">
                                                <stop offset="0%" stopColor="rgb(7,18,48)" stopOpacity="0.78" />
                                                <stop offset="50%" stopColor="rgb(13,58,138)" stopOpacity="0.78" />
                                                <stop offset="100%" stopColor="rgb(220,245,255)" stopOpacity="0.78" />
                                            </linearGradient>
                                        </defs>
                                        <g><path d="M 140 0 L 140 72" stroke="rgba(0,40,100,0.5)" strokeWidth={8} fill="none" strokeLinecap="round" /><path d="M 140 0 L 140 72" stroke="rgba(0,110,255,0.42)" strokeWidth={4} fill="none" strokeLinecap="round" /><path d="M 140 0 L 140 72" stroke="#50C8FF" strokeWidth={1.6} fill="none" strokeLinecap="round" /><path d="M 140 0 L 140 72" stroke="rgba(210,245,255,0.7)" strokeWidth={0.5} fill="none" strokeLinecap="round" /></g>
                                        {[{ d: "M 300 0 L 300 44 C 300 62 285 72 268 72", dot: { cx: 268, cy: 72 } }, { d: "M 637 0 L 637 44 C 637 62 620 72 600 72", dot: { cx: 600, cy: 72 } }, { d: "M 1069 0 L 1069 44 C 1069 62 1052 72 1032 72", dot: { cx: 1032, cy: 72 } }].map(({ d, dot }, pi) => (
                                            <g key={`conn${pi}`}><path d={d} stroke="rgba(0,40,100,0.5)" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke="rgba(0,110,255,0.42)" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke="#50C8FF" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={d} stroke="rgba(210,245,255,0.7)" strokeWidth={0.5} fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx={dot.cx} cy={dot.cy} r={5} fill="rgba(0,102,255,0.2)" /><circle cx={dot.cx} cy={dot.cy} r={2.5} fill="rgba(80,200,255,0.7)" /><circle cx={dot.cx} cy={dot.cy} r={1.1} fill="rgba(220,245,255,0.95)" /></g>
                                        ))}
                                        <path d="M 200 72 L 268 72" stroke="url(#hlG22a)" strokeWidth={2.2} fill="none" strokeLinecap="butt" />
                                        <path d="M 200 72 L 268 72" stroke="url(#hlG07a)" strokeWidth={0.7} fill="none" strokeLinecap="butt" />
                                        <g style={{ animation: 'lineGlow 1.8s ease-in-out infinite' }}>
                                            <path d="M 268 72 L 1295 72 C 1330 72 1338 62 1338 10" stroke="rgba(0,40,100,0.5)" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M 268 72 L 1295 72 C 1330 72 1338 62 1338 10" stroke="rgba(0,110,255,0.42)" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M 268 72 L 1295 72 C 1330 72 1338 62 1338 10" stroke="#50C8FF" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M 268 72 L 1295 72 C 1330 72 1338 62 1338 10" stroke="rgba(220,245,255,0.78)" strokeWidth={0.7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        {[402, 602, 804, 1004].map((x, i) => (<g key={`ha${i}`} style={{ animation: `arrBlink${i} 1.8s ease-in-out ${i * 0.3}s infinite` }}><path d={`M ${x - 9} 62 L ${x + 9} 72 L ${x - 9} 82`} stroke="#50C8FF" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>))}
                                    </svg>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'stretch', gap: tab ? 4 : 6, animation: 'log_in .7s ease-out .16s both', marginBottom: tab ? 3 : 4, marginTop: tab ? 22 : 32, flexShrink: 0, width: '100%' }}>
                                    {processSteps.map((step, i) => (
                                        <div key={`lgstepd-${i}`} style={{ flex: '1 1 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: tab ? '0 1px' : '0 2px', position: 'relative' }}>
                                            {i === 4 && [{ top: '-12%', left: '18%', sz: 14, delay: '0s' }, { top: '4%', left: '62%', sz: 10, delay: '0.55s' }, { top: '-6%', left: '76%', sz: 12, delay: '1.05s' }, { top: '14%', left: '8%', sz: 9, delay: '0.75s' }, { top: '28%', left: '82%', sz: 11, delay: '1.35s' }, { top: '-18%', left: '45%', sz: 8, delay: '0.25s' }].map((sp, si) => (<div key={si} style={{ position: 'absolute', top: sp.top, left: sp.left, width: sp.sz, height: sp.sz, animation: `sparkle 2.4s ease-in-out ${sp.delay} infinite`, pointerEvents: 'none', zIndex: 10 }}><svg width={sp.sz} height={sp.sz} viewBox="0 0 20 20"><path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="rgba(80,200,255,0.9)" /></svg></div>))}
                                            <img src={step.img} alt={step.title.replace('\n', ' ')} style={{ width: '100%', maxWidth: tab ? 110 : 150, height: tab ? 80 : 110, objectFit: 'contain', filter: 'drop-shadow(0 4px 14px rgba(80,200,255,0.35))', animation: 'log_glow 4s ease-in-out infinite', animationDelay: `${i * 0.45}s` }} onError={e => e.target.style.display = 'none'} />
                                        </div>
                                    ))}
                                </div>
                                <div style={{ position: 'relative', width: '100%', height: tab ? 22 : 26, flexShrink: 0 }}>
                                    <svg width="100%" height="100%" viewBox="0 0 1340 26" preserveAspectRatio="none" style={{ overflow: 'visible', display: 'block' }}>
                                        <defs>
                                            <linearGradient id="blG22" gradientUnits="userSpaceOnUse" x1="134" y1="13" x2="1295" y2="13">
                                                <stop offset="0%" stopColor="#071230" /><stop offset="33%" stopColor="#0d3a8a" /><stop offset="66%" stopColor="#1a7ad4" /><stop offset="100%" stopColor="#50C8FF" />
                                            </linearGradient>
                                            <linearGradient id="blG07" gradientUnits="userSpaceOnUse" x1="134" y1="13" x2="1295" y2="13">
                                                <stop offset="0%" stopColor="rgb(7,18,48)" stopOpacity="0.78" /><stop offset="33%" stopColor="rgb(13,58,138)" stopOpacity="0.78" /><stop offset="66%" stopColor="rgb(26,122,212)" stopOpacity="0.78" /><stop offset="100%" stopColor="rgb(220,245,255)" stopOpacity="0.78" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M 134 13 L 1295 13 C 1330 13 1338 8 1338 -26 L 1338 -440 C 1338 -456 1328 -460 1300 -458" stroke="rgba(0,40,100,0.5)" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M 134 13 L 1295 13 C 1330 13 1338 8 1338 -26 L 1338 -440 C 1338 -456 1328 -460 1300 -458" stroke="rgba(0,110,255,0.42)" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M 134 13 L 1295 13 C 1330 13 1338 8 1338 -26 L 1338 -440 C 1338 -456 1328 -460 1300 -458" stroke="url(#blG22)" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M 134 13 L 1295 13 C 1330 13 1338 8 1338 -26 L 1338 -440 C 1338 -456 1328 -460 1300 -458" stroke="url(#blG07)" strokeWidth={0.7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                        {[402, 602, 804, 1004].map((x, i) => (<g key={`barr_${i}`} style={{ animation: `arrBlink${i} 1.8s ease-in-out ${i * 0.3 + 0.15}s infinite` }}><path d={`M ${x - 9} 4 L ${x + 9} 13 L ${x - 9} 22`} stroke="#50C8FF" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>))}
                                    </svg>
                                </div>
                                <div style={{ display: 'flex', gap: 0, width: '100%', justifyContent: 'space-between', animation: 'log_in .75s ease-out .2s both', flexShrink: 0, paddingTop: tab ? 4 : 6 }}>
                                    {processSteps.map((step, i) => (
                                        <React.Fragment key={`lgsteplbl-${i}`}>
                                            <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: tab ? '0 2px' : '0 4px', position: 'relative' }}>
                                                <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: tab ? '0.75rem' : '0.86rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2, whiteSpace: 'pre-line' }}>{step.title}</p>
                                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.65rem' : '0.74rem', color: 'rgba(255,255,255,0.92)', margin: '2px 0 0', lineHeight: 1.2, fontWeight: 500 }}>{step.sub}</p>
                                            </div>
                                            {i < processSteps.length - 1 && (<div style={{ width: 1.5, height: tab ? 36 : 44, background: 'linear-gradient(to bottom, transparent 0%, rgba(80,200,255,0.65) 30%, rgba(80,200,255,0.65) 70%, transparent 100%)', flexShrink: 0, alignSelf: 'center' }} />)}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    // ─── SLIDE 4 REAL ESTATE ───────────────────────────────────────────────
    const renderRealEstateSlide = () => {
        const glassBox = {
            background: 'linear-gradient(135deg, rgba(30,14,4,0.72) 0%, rgba(55,28,8,0.68) 50%, rgba(40,20,6,0.74) 100%)',
            border: '1.5px solid rgba(180,120,40,0.55)',
            backdropFilter: 'blur(10px) saturate(160%)',
            WebkitBackdropFilter: 'blur(10px) saturate(160%)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(220,170,60,0.18)',
            borderRadius: 14,
        };
        const statItems = [{ stat: '₹5+ Crore', sub: 'Ad Spend Managed' }, { stat: '110+ Homes', sub: 'Sold in 1 Year' }, { stat: '400-500 Leads', sub: 'Per Month Automated' }];
        const monMaxW = mob ? 280 : tab ? 340 : 500;

        const reBtnStyle = (isMob, isTab) => ({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(245,230,175,0.92)',
            border: '1.5px solid rgba(160,120,60,0.6)',
            borderRadius: '30px',
            padding: isMob ? '0.52rem 1.8rem' : isTab ? '0.58rem 1.9rem' : '0.66rem 2.3rem',
            color: '#3D2B1F',
            fontFamily: "'Libre Baskerville',serif",
            fontWeight: 700,
            fontSize: isMob ? '0.82rem' : isTab ? '0.86rem' : '0.92rem',
            cursor: 'pointer',
            letterSpacing: '0.3px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'transform 0.2s',
            animation: 'ngo_pulse 3s ease-in-out infinite',
            flexShrink: 0,
        });

        return (
            <>
                <style>{`
                    @keyframes re_in{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
                    @keyframes re_glow{0%,100%{box-shadow:0 4px 24px rgba(0,0,0,0.5),inset 0 1px 0 rgba(220,170,60,0.18);}50%{box-shadow:0 8px 36px rgba(180,120,40,0.35),inset 0 1px 0 rgba(220,170,60,0.35);}}
                    @keyframes re_border_pulse{0%,100%{border-color:rgba(180,120,40,0.45);}50%{border-color:rgba(220,160,50,0.75);}}
                `}</style>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://pub-8d8c06eb82144fca803dab6ccecd7b41.r2.dev/Images/VMimg.webp')", backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(10,4,1,0.87) 0%,rgba(16,7,2,0.80) 40%,rgba(8,3,1,0.90) 100%)', zIndex: 1 }} />

                {/* ── MOBILE REAL ESTATE ── */}
                {mob && (
                    <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', padding: `${slidePad.top}px ${slidePad.side}px ${slidePad.bot}px`, gap: 14, boxSizing: 'border-box', overflowY: 'auto', overflowX: 'hidden' }}>
                        <h1 style={{ fontFamily: "'Libre Baskerville',serif", color: '#F5F0DC', fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.2, margin: 0, textAlign: 'center', animation: 're_in .5s ease-out both' }}>We Doubled Real Estate<br />Sales Using Digital<br />Infrastructure.</h1>
                        <div className="hero-statline-mob" style={{ display: 'flex', flexDirection: 'column', gap: 8, animation: 're_in .55s ease-out .05s both' }}>
                            {[{ bold: '₹5+ Crore', rest: ' performance marketing executed.' }, { bold: '300%', rest: ' growth. 100% automation.' }, { bold: 'From 50 units', rest: ' to 110+ homes sold annually.' }].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                    <span style={{ color: 'rgba(200,155,50,0.75)', fontSize: '0.72rem', marginTop: 2, flexShrink: 0 }}>•</span>
                                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: 'rgba(230,215,175,0.9)', margin: 0, lineHeight: 1.5 }}><span style={{ fontWeight: 700, color: '#F0DFA0' }}>{item.bold}</span>{item.rest}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8, animation: 're_in .6s ease-out .08s both' }}>
                            {statItems.map((s, i) => (
                                <div key={i} style={{ ...glassBox, flex: '1 1 0', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 4, animation: 're_glow 4s ease-in-out infinite', animationDelay: `${i * 0.4}s` }}>
                                    <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: '0.85rem', fontWeight: 800, color: '#F0DFA0', lineHeight: 1, textAlign: 'center', width: '100%' }}>{s.stat}</span>
                                    <div style={{ width: '60%', height: 1, background: 'rgba(180,130,40,0.35)', margin: '2px 0' }} />
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.5rem', color: 'rgba(215,190,140,0.85)', lineHeight: 1.3, fontWeight: 500, textAlign: 'center', width: '100%' }}>{s.sub}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 6, animation: 're_in .65s ease-out .1s both' }}>
                            {[0, 1, 2].map(ci => (
                                <div key={ci} style={{ ...glassBox, flex: '1 1 0', padding: '5px 3px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 4, minWidth: 0, overflow: 'hidden', borderRadius: 10 }}>
                                    <REBrandCarousel containerIndex={ci} tab={false} mob={true} />
                                </div>
                            ))}
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: 210, animation: 're_in .7s ease-out .12s both', flexShrink: 0 }}>
                            <div style={{ position: 'absolute', left: '2%', top: 0, width: '65%', zIndex: 2, transform: 'perspective(700px) rotateY(-8deg) rotateZ(1deg)', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.8))' }}><CSSMonitor screenImages={RE_MONITOR_IMAGES} uid="re_mon_m" maxWidth={220} /></div>
                            <div style={{ position: 'absolute', left: '63%', bottom: 0, width: 50, zIndex: 4, transform: 'perspective(400px) rotateY(10deg) rotateZ(-2deg)', filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.8))' }}><CSSMobile screenImages={RE_MOBILE1_IMAGES} uid="re_mob1_m" maxWidth={50} /></div>
                            <div style={{ position: 'absolute', left: '76%', bottom: 8, width: 38, zIndex: 5, transform: 'perspective(400px) rotateY(8deg) rotateZ(-1deg)', filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.7))' }}><CSSMobile screenImages={RE_MOBILE2_IMAGES} uid="re_mob2_m" maxWidth={38} /></div>
                        </div>
                        <div className="hero-cta-mob" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px', animation: 're_in .57s ease-out .06s both', marginTop: 'auto' }}>
                            <Link to="/portfolio/virtual-tour" style={{ ...reBtnStyle(mob, tab), flex: '1 1 0', textAlign: 'center' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; e.currentTarget.style.animation = 'none'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.animation = 'ngo_pulse 3s ease-in-out infinite'; }}>
                                View More →
                            </Link>
                            <Link to="/portfolio/builders" style={{ ...reBtnStyle(mob, tab), flex: '1 1 0', textAlign: 'center' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; e.currentTarget.style.animation = 'none'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.animation = 'ngo_pulse 3s ease-in-out infinite'; }}>
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                )}

                {/* ── DESKTOP / TAB REAL ESTATE ── */}
                {!mob && (
                    <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: `${slidePad.top}px ${slidePad.side}px ${slidePad.bot}px`, boxSizing: 'border-box', marginTop: "-155px" }}>
                        <div style={{ width: '100%', maxWidth: 1300, display: 'grid', gridTemplateColumns: tab ? '52% 48%' : '50% 50%', gap: tab ? 24 : 40, alignItems: 'start', height: '100%' }}>
                            {/* Left column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? 12 : 16, justifyContent: 'flex-start', marginTop: "190px" }}>
                                <h1 style={{ fontFamily: "'Libre Baskerville',serif", color: '#F5F0DC', fontSize: tab ? '1.9rem' : '2.5rem', fontWeight: 700, lineHeight: 1.18, margin: 0, animation: 're_in .5s ease-out both', paddingTop: mob ? '10px' : tab ? '45px' : '75px' }}>We Doubled Real Estate<br />Sales Using Digital<br />Infrastructure.</h1>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? 8 : 10, animation: 're_in .55s ease-out .06s both' }}>
                                    {[{ bold: '₹5+ Crore', rest: ' performance marketing executed.' }, { bold: '300%', rest: ' growth. 100% automation.' }, { bold: 'From 50 units', rest: ' to 110+ homes sold annually.' }].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                            <span style={{ color: 'rgba(200,155,50,0.7)', fontSize: tab ? '0.8rem' : '0.88rem', marginTop: 3, flexShrink: 0 }}>•</span>
                                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.82rem' : '0.9rem', color: 'rgba(230,215,175,0.88)', margin: 0, lineHeight: 1.55 }}><span style={{ fontWeight: 700, color: '#F0DFA0' }}>{item.bold}</span>{item.rest}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px', flexWrap: 'wrap', animation: 're_in .57s ease-out .07s both' }}>
                                    <Link to="/portfolio/virtual-tour" style={reBtnStyle(mob, tab)} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; e.currentTarget.style.animation = 'none'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.animation = 'ngo_pulse 3s ease-in-out infinite'; }}>View More →</Link>
                                    <Link to="/portfolio/builders" style={reBtnStyle(mob, tab)} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; e.currentTarget.style.animation = 'none'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.animation = 'ngo_pulse 3s ease-in-out infinite'; }}>View Portfolio</Link>
                                </div>
                                <div style={{ display: 'flex', gap: tab ? 8 : 12, animation: 're_in .6s ease-out .1s both' }}>
                                    {statItems.map((s, i) => (
                                        <div key={i} style={{ ...glassBox, flex: '1 1 0', padding: tab ? '14px 10px' : '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 5, animation: 're_glow 4s ease-in-out infinite', animationDelay: `${i * 0.5}s`, transition: 'transform .3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
                                            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: tab ? '1.18rem' : '1.45rem', fontWeight: 800, color: '#F0DFA0', lineHeight: 1, textAlign: 'center', width: '100%' }}>{s.stat}</span>
                                            <div style={{ width: '65%', height: 1, background: 'rgba(180,130,40,0.38)', margin: '2px 0' }} />
                                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: tab ? '0.6rem' : '0.68rem', color: 'rgba(215,190,140,0.85)', lineHeight: 1.35, fontWeight: 500, textAlign: 'center', width: '100%' }}>{s.sub}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            {/* Right column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tab ? 14 : 18, alignItems: 'center', justifyContent: 'flex-start', paddingTop: mob ? '8px' : tab ? '35px' : '55px' }}>
                                <div style={{ position: 'relative', width: '100%', height: tab ? 400 : 520, animation: 're_in .58s ease-out .07s both', flexShrink: 0 }}>
                                    {/* Was width 82%/88%, rendering 211,217 px² — the largest element on the
    page. This slide mounts ~21s into the hero rotation, and because LCP
    keeps updating until user interaction, that late paint became the
    site's Largest Contentful Paint (11.2s). At 54%/58% the mockup is
    ~91,800 px², below the hero portrait's 100,639 px², so LCP settles on
    the portrait at ~0.7s instead. */}
                                    <div style={{ position: 'absolute', left: '2%', bottom: 0, width: tab ? '54%' : '58%', zIndex: 2, transform: 'perspective(1000px) rotateY(-8deg) rotateZ(1deg)', filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.85))' }}><CSSMonitor screenImages={RE_MONITOR_IMAGES} uid="re_mon_d" maxWidth={monMaxW} /></div>
                                    <div style={{ position: 'absolute', right: tab ? '-2%' : '0%', bottom: 0, width: tab ? 88 : 112, zIndex: 4, transform: 'perspective(500px) rotateY(14deg) rotateZ(-2deg)', filter: 'drop-shadow(0 14px 36px rgba(0,0,0,0.85))' }}><CSSMobile screenImages={RE_MOBILE1_IMAGES} uid="re_mob1_d" maxWidth={tab ? 88 : 112} /></div>
                                    <div style={{ position: 'absolute', right: tab ? '14%' : '16%', bottom: 0, width: tab ? 64 : 80, zIndex: 5, transform: 'perspective(500px) rotateY(10deg) rotateZ(-1deg)', filter: 'drop-shadow(0 10px 26px rgba(0,0,0,0.75))' }}><CSSMobile screenImages={RE_MOBILE2_IMAGES} uid="re_mob2_d" maxWidth={tab ? 64 : 80} /></div>
                                </div>
                                <div style={{ display: 'flex', gap: tab ? 8 : 12, animation: 're_in .65s ease-out .14s both', width: '100%' }}>
                                    {[0, 1, 2].map(ci => (
                                        <div key={ci} style={{ ...glassBox, flex: '1 1 0', padding: tab ? '8px 4px' : '10px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: tab ? 3 : 4, animation: 're_border_pulse 3.5s ease-in-out infinite', animationDelay: `${ci * 0.6}s`, transition: 'transform .25s', minWidth: 0, overflow: 'hidden', borderRadius: 10 }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
                                            <REBrandCarousel containerIndex={ci} tab={tab} mob={false} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    const renderFounderSlide = () => (
        <>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cur.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: .22, filter: 'blur(3px)', zIndex: 0 }} />

            {!mob && (
                <>
                    <div style={{ position: 'absolute', top: '10%', left: tab ? '3%' : '5%', width: tab ? 180 : 280, height: tab ? 180 : 280, background: `radial-gradient(circle,${colors.metallicGold}30 0%,transparent 70%)`, animation: 'morphBlob 8s ease-in-out infinite', transform: `translate(${mouse.x * .3}px,${mouse.y * .3}px)`, filter: 'blur(30px)', opacity: .5, zIndex: 0 }} />
                    <div style={{ position: 'absolute', bottom: '15%', right: tab ? '5%' : '8%', width: tab ? 160 : 240, height: tab ? 160 : 240, background: `radial-gradient(circle,${colors.accentBlue}50 0%,transparent 70%)`, animation: 'morphBlob 10s ease-in-out infinite reverse', transform: `translate(${-mouse.x * .3}px,${-mouse.y * .3}px)`, filter: 'blur(25px)', opacity: .4, zIndex: 0 }} />
                </>
            )}
            <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto', paddingTop: slidePad.top, paddingBottom: slidePad.bot, paddingLeft: slidePad.side, paddingRight: slidePad.side, position: 'relative', zIndex: 2, boxSizing: 'border-box' }}>
                <div style={{ display: 'grid', gridTemplateColumns: mob || tab ? '1fr' : '1fr 1fr', gap: mob ? 0 : tab ? '1.5rem' : '2.5rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', order: mob ? 1 : 2, marginTop: 0, overflow: 'visible', width: '100%', marginLeft: mob ? 0 : tab ? 20 : 60, paddingBottom: mob ? 60 : 0 }}>
                        <div style={{ width: mob ? '260px' : tab ? '340px' : '650px', height: mob ? '260px' : tab ? '340px' : '650px', position: 'relative', transform: !mob ? `translate(${mouse.x * .2}px,${mouse.y * .2}px)` : 'none', overflow: 'visible' }}>
                            <Callout uid={`ig${slide}`} label={short(cur.socialCounts.instagram)} Icon={IgIcon} gradient="linear-gradient(135deg,#833AB4,#E1306C)" glow="rgba(131,58,180,0.55)" pillDir="right" imageEdge="left" topPx={SZ.igTop} dotD={SZ.dotD} pillW={SZ.pillW} pillH={SZ.pillH} iconDot={SZ.iconDot} fs={SZ.fs} delay={0} edgePadPx={SZ.edgePadLeft} onClick={() => openLink(SOCIAL_LINKS[0])} />
                            <Callout uid={`yt${slide}`} label={short(cur.socialCounts.youtube)} Icon={YtIcon} gradient="linear-gradient(135deg,#FF0000,#FF4444)" glow="rgba(255,0,0,0.5)" pillDir="right" imageEdge="left" bottomPx={SZ.ytBottom} dotD={SZ.dotD} pillW={SZ.pillW} pillH={SZ.pillH} iconDot={SZ.iconDot} fs={SZ.fs} delay={1} edgePadPx={SZ.edgePadLeft} onClick={() => openLink(SOCIAL_LINKS[1])} />
                            <Callout uid={`fb${slide}`} label={short(cur.socialCounts.facebook)} Icon={FbIcon} gradient="linear-gradient(135deg,#1877F2,#4DABF7)" glow="rgba(24,119,242,0.5)" pillDir="left" imageEdge="right" topPx={SZ.fbTop} dotD={SZ.fbDotD} pillW={SZ.pillW} pillH={SZ.pillH} iconDot={SZ.iconDot} fs={SZ.fs} delay={2} edgePadPx={SZ.fbEdgePad} onClick={() => openLink(SOCIAL_LINKS[2])} />
                            <img src={cur.imageUrl} alt={cur.founderName} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))', position: 'relative', zIndex: 10 }} onError={e => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230a1929'/%3E%3C/svg%3E"; }} />
                            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', padding: mob ? '0.4rem 0.9rem' : '0.55rem 1.2rem', borderRadius: 8, background: '#000', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: mob ? 200 : 350, maxWidth: '92%', textAlign: 'center', whiteSpace: 'nowrap', zIndex: 20 }}>
                                <h2 style={{ color: '#fff', fontSize: mob ? '0.8rem' : '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.3rem', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{cur.founderName}</h2>
                                <p style={{ fontSize: mob ? '0.65rem' : '0.75rem', color: colors.lightMetallicGold, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', borderTop: `1px solid ${colors.metallicGold}40`, paddingTop: '0.3rem', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cur.founderTitle}</p>
                            </div>
                        </div>
                        {mob && (
                            <div onClick={() => navigate(currentService.route)} style={{ position: 'absolute', bottom: -15, left: '50%', transform: 'translateX(-50%)', padding: '0.3rem 0.75rem', borderRadius: 18, backgroundColor: '#F8F4E6', color: '#8B6914', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer', minWidth: 115, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap', zIndex: 100 }}>
                                {currentService.name}
                            </div>
                        )}
                    </div>
                    <div style={{ order: mob ? 2 : 1, marginTop: mob ? 20 : 0, paddingLeft: mob ? '0.5rem' : 0, paddingRight: mob ? '0.5rem' : 0 }}>
                        {!mob && (
                            <div onClick={() => navigate(currentService.route)} style={{ marginBottom: '1rem', padding: '0.58rem 1.3rem', borderRadius: 25, backgroundColor: '#F8F4E6', color: '#8B6914', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 178, height: 43, textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
                                {currentService.name}
                            </div>
                        )}
                        <div style={{ marginBottom: mob ? '0.6rem' : '0.8rem' }}>
                            <div style={{ fontSize: mob ? '1.6rem' : tab ? '2rem' : '2.3rem', color: '#fff', lineHeight: 1.15, fontWeight: 700, marginBottom: '0.3rem', textAlign: mob ? 'center' : 'left' }}>{cur.titleLine1}</div>
                            <div style={{ fontSize: mob ? '1.68rem' : tab ? '2.1rem' : '2.42rem', color: colors.metallicGold, lineHeight: 1.15, fontWeight: 700, textAlign: mob ? 'center' : 'left' }}>{cur.titleLine2}</div>
                        </div>
                        {!mob && (
                            <div style={{ padding: '0.8rem', borderRadius: 12, marginBottom: '1rem', background: 'linear-gradient(135deg,rgba(197,160,40,0.06),rgba(30,58,95,0.15))', border: `1px solid rgba(197,160,40,0.15)`, borderLeft: `3px solid ${colors.metallicGold}` }}>
                                <p style={{ fontSize: '0.85rem', color: colors.lightMetallicGold, lineHeight: 1.5, fontStyle: 'italic' }}>"{cur.quote}"</p>
                            </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? '0.8rem' : '1rem', marginBottom: mob ? '0.5rem' : '1.2rem' }}>
                            <div style={{ padding: 0, borderRadius: 14, border: `1.5px solid ${colors.metallicGold}30`, height: mob ? 140 : tab ? 195 : 215, overflow: 'hidden', cursor: 'pointer', background: 'linear-gradient(135deg,rgba(197,160,40,0.06),rgba(30,58,95,0.15))' }}
                                onMouseEnter={() => setGifHover(true)} onMouseLeave={() => setGifHover(false)}>
                                <img src={cur.gifUrl} alt="demo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14, transition: 'transform .3s', transform: gifHover ? 'scale(1.05)' : 'scale(1)' }} loading="lazy" decoding="async" />
                            </div>
                            <div style={{ padding: mob ? '1rem' : '1.3rem', borderRadius: 14, height: mob ? 140 : tab ? 195 : 215, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center' }}>
                                <p style={{ color: colors.cream, fontFamily: "'Inter',sans-serif", fontSize: mob ? '0.88rem' : tab ? '0.91rem' : '0.96rem', fontWeight: 600, lineHeight: mob ? 1.6 : 1.72, textAlign: mob ? 'center' : 'left', wordBreak: 'break-word' }}>{cur.boxDescription}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: '0.6rem', marginTop: mob ? '0.8rem' : '1rem', alignItems: mob ? 'stretch' : 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: mob ? 'center' : 'flex-start', padding: '0.4rem 0.8rem', borderRadius: 8, background: 'linear-gradient(135deg,rgba(197,160,40,0.1),rgba(30,58,95,0.2))', border: '1px solid rgba(197,160,40,0.2)', width: mob ? '100%' : 'auto', flexShrink: 0 }}>
                                <Sparkles size={14} color={colors.metallicGold} style={{ marginRight: '0.5rem' }} />
                                <span style={{ background: 'linear-gradient(90deg,#C5A028 0%,#E6C35C 50%,#C5A028 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: mob ? '0.9rem' : '1rem', fontWeight: 700, letterSpacing: '0.3px', textTransform: 'uppercase' }}>Services Offered →</span>
                            </div>
                            <div style={{ display: 'flex', gap: mob ? '0.3rem' : '0.5rem', flex: 1, alignItems: 'stretch' }}>
                                {cur.buttons.map((b, i) => (
                                    <button key={i} onClick={() => navigate(b.link)} style={{ flex: 1, minWidth: 0, height: mob ? 28 : 42, padding: mob ? '0 5px' : '0 20px', borderRadius: 21, background: '#F8F4E6', color: '#C5A028', fontFamily: "'Libre Baskerville',serif", fontWeight: 600, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: mob ? '0.2px' : '0.4px', whiteSpace: 'nowrap', fontSize: mob ? '0.55rem' : tab ? '0.68rem' : '0.72rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {b.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="hc">
            <style>{`
                html,body{margin:0!important;padding:0!important;}
                .hc{width:100%;position:relative;overflow-x:hidden;max-width:100vw;margin:0!important;padding:0!important;display:block;}
                .hc,.hc *{margin:0;padding:0;box-sizing:border-box;}
                *,*::before,*::after{scrollbar-width:none;-ms-overflow-style:none;}
                *::-webkit-scrollbar{display:none!important;width:0!important;height:0!important;}
                @keyframes morphBlob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;}25%{border-radius:40% 60% 70% 30%/40% 70% 30% 60%;}50%{border-radius:70% 30% 40% 60%/30% 60% 40% 70%;}75%{border-radius:30% 70% 60% 40%/70% 40% 60% 30%;}}
                @keyframes fadeScale{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}
                @keyframes arrowG{0%,100%{filter:drop-shadow(0 0 2px rgba(197,160,40,0.5));}50%{filter:drop-shadow(0 0 6px rgba(197,160,40,1));}}
                @keyframes ngo_pulse{0%,100%{box-shadow:0 2px 16px rgba(109,66,38,0.2),inset 0 1px 0 rgba(255,255,255,0.55);}50%{box-shadow:0 4px 26px rgba(109,66,38,0.35),inset 0 1px 0 rgba(255,255,255,0.8);}}
                .hc .sec{position:relative;overflow-x:clip;overflow-y:visible;}
                @media(max-width:767px){.hc{-webkit-overflow-scrolling:touch;}.hc .sec{contain:layout style;}}
            `}</style>

            {/* The mobile header already has a hamburger, so this floating menu was
    duplicate navigation there — and it sat on top of the stat cards.
    Desktop keeps it, where the extra shortcut does no harm. */}
              <RadialNavMenu mob={mob} isFirstSlide={origSlide === 0} />

            <div ref={wrapperRef} style={{ position: 'relative', width: '100%', minHeight: mob ? `calc(100svh - ${dockH}px)` : '100vh', margin: 0, padding: 0, overflowX: 'hidden', top: 0 }}>
                <div style={{ position: 'relative', overflowX: 'clip', overflowY: 'visible', margin: 0, width: '100%' }}>

                    <div style={{ position: 'sticky', top: 100, height: 0, overflow: 'visible', zIndex: 9999, pointerEvents: 'none' }}>
                        <button onClick={prev} aria-label="Previous" style={{ pointerEvents: 'auto', position: 'absolute', left: mob ? 6 : tab ? 14 : 20, top: '50vh', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', padding: mob ? '6px 2px' : '10px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'arrowG 2s ease-in-out infinite' }}
                            onMouseEnter={e => e.currentTarget.querySelector('svg').style.transform = 'scale(1.28)'}
                            onMouseLeave={e => e.currentTarget.querySelector('svg').style.transform = 'scale(1)'}>
                            <ChevronLeft size={mob ? 26 : tab ? 32 : 38} color="#C5A028" strokeWidth={2.8} />
                        </button>
                        <button onClick={next} aria-label="Next" style={{ pointerEvents: 'auto', position: 'absolute', right: mob ? 6 : tab ? 14 : 20, top: '50vh', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', padding: mob ? '6px 2px' : '10px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'arrowG 2s ease-in-out infinite' }}
                            onMouseEnter={e => e.currentTarget.querySelector('svg').style.transform = 'scale(1.28)'}
                            onMouseLeave={e => e.currentTarget.querySelector('svg').style.transform = 'scale(1)'}>
                            <ChevronRight size={mob ? 26 : tab ? 32 : 38} color="#C5A028" strokeWidth={2.8} />
                        </button>
                    </div>

                    {/* ── Main section with touch swipe support ── */}
                    <section id="home"
                        className="sec"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        style={{ minHeight: mob ? `calc(100svh - ${dockH}px)` : '100vh', background: '#0d1b2a', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', overflowX: 'hidden', overflowY: 'visible', position: 'relative', top: 0, touchAction: 'pan-y',
                            // RadialNavMenu is absolutely positioned at right:0 over this
                            // full-width section, so slide content ran underneath it — at
                            // 1382px the expanded menu column sat on top of the stat cards.
                            // Reserve the strip it occupies (80px button + breathing room).
                            paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}
                    >
                        {origSlide === 0 && renderNGOSlide()}
                        {origSlide === 1 && renderEcomSlide()}
                        {origSlide === 2 && renderInfraSlide()}
                        {origSlide === 3 && renderLogisticsSlide()}
                        {origSlide === 6 && renderRealEstateSlide()}
                        {isFounderSlide && renderFounderSlide()}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;