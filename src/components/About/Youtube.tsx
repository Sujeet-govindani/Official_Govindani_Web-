import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const videos = [
  {
    id: "1",
    title: "From Idea to Empire: The Startup Framework That Changes Everything",
    videoId: "dQw4w9WgXcQ",
    views: "2.5M",
    duration: "18:42",
    category: "Startup Strategy"
  },
  {
    id: "2",
    title: "Digital Marketing Secrets: How I Generated ₹5 Crore for Clients",
    videoId: "9bZkp7q19f0",
    views: "1.8M",
    duration: "24:15",
    category: "Marketing"
  },
  {
    id: "3",
    title: "The Mindset Shift: Why 99% of Founders Fail (And How You Won't)",
    videoId: "jNQXAC9IVRw",
    views: "3.2M",
    duration: "15:30",
    category: "Mindset"
  },
  {
    id: "4",
    title: "SEO Mastery: Rank #1 on Google in 90 Days",
    videoId: "kJQP7kiw5Fk",
    views: "1.4M",
    duration: "21:08",
    category: "SEO"
  },
  {
    id: "5",
    title: "Real Estate Revolution: ₹100 Crore Strategy Revealed",
    videoId: "fJ9rUzIMcZQ",
    views: "2.1M",
    duration: "19:55",
    category: "Real Estate"
  },
  {
    id: "6",
    title: "Building a Personal Brand: From Zero to 100K Subscribers",
    videoId: "OPf0YbXqDm0",
    views: "1.9M",
    duration: "16:23",
    category: "Branding"
  }
];

const headerReveal = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const headingAnim = keyframes`
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

const controlReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const countUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const tabletReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const mobileReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const floatMobile = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const PageWrapper = styled.div`
  
  min-height: 100vh;
  background-color: hsl(0, 10%, 10%);
  color: white;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: hsl(0, 10%, 20%);
  padding: 0 2.5rem 0 5rem;
  animation: ${headerReveal} 1s ease-in both;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const NavLink = styled.a`
  display: inline-flex;
  padding: 1em 1.25em;
  text-decoration: none;
  color: white;
  font-family: 'Cormorant Garamond', serif;
  transition: color 0.3s ease;

  &:hover {
    color: #d4af37;
  }

  @media (max-width: 768px) {
    padding: 1em 0.75em;
    font-size: 0.9rem;
  }
`;

const Logo = styled(NavLink)`
  font-family: 'Libre Baskerville', serif;
  font-size: 1.5em;
  font-weight: bold;
  padding: 0;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
  gap: 2rem;
  padding: 6rem 5rem 4rem;
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 15% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 40%),
      radial-gradient(circle at 85% 80%, rgba(218, 165, 32, 0.06) 0%, transparent 40%);
    pointer-events: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 7rem 3rem 3rem;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    padding: 6rem 1.5rem 2rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    gap: 2.5rem;
  }
`;

const ContentArea = styled.div`
  padding-right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.8rem;

  @media (max-width: 1200px) {
    padding-right: 0;
  }
`;

const Badge = styled.div`
  display: inline-block;
  align-self: flex-start;
  color: #d4af37;
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 8px 24px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 30px;
  background: rgba(212, 175, 55, 0.05);
  backdrop-filter: blur(10px);
`;

const Heading = styled.h1`
  font-family: 'Libre Baskerville', serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.5px;
  clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  animation: ${headingAnim} 1s 1s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;

  .highlight {
    background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }
`;

const Caption = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  letter-spacing: 0.5px;
  clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  animation: ${headingAnim} 1s 1.6s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

interface StatBoxProps {
  delay?: string;
}

const StatBox = styled.div<StatBoxProps>`
  text-align: left;
  position: relative;
  animation: ${countUp} 0.8s ease-out backwards;
  animation-delay: ${props => props.delay || '0s'};

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #d4af37, transparent);
  }
`;

const StatNumber = styled.div`
  font-family: 'Libre Baskerville', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const CTASection = styled.div`
  padding: 1.5rem 1.25rem;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(0, 0, 0, 0.3) 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  position: relative;
  max-width: 400px;
  backdrop-filter: blur(10px);

  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

const CTATitle = styled.h3`
  font-family: 'Libre Baskerville', serif;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const CTAText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.25rem;
  line-height: 1.5;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #d4af37 0%, #c9920e 100%);
  color: #000000;
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 30px rgba(212, 175, 55, 0.25);

  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(212, 175, 55, 0.4);

    &::after {
      transform: translateX(4px);
    }
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    gap: 3rem;
  }
`;

const DevicesArea = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: center;
  perspective: 2000px;
  padding: 2rem 0;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const TabletDevice = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 4/3;
  transform-style: preserve-3d;
  animation: 
    ${tabletReveal} 1s ease-out forwards,
    ${float} 6s ease-in-out infinite 1s;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;

  &:hover {
    transform: rotateY(-15deg) rotateX(5deg) translateY(-15px);
    animation: none;
  }

  @media (max-width: 1200px) {
    max-width: 600px;
    margin: 0 auto;
  }

  @media (hover: none) {
    &:active {
      transform: rotateY(-15deg) rotateX(5deg) scale(0.98);
    }
  }
`;

const TabletFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 
    0 30px 80px rgba(0, 0, 0, 0.5),
    0 0 0 8px #1a1a1a,
    0 0 0 10px #333,
    inset 0 0 20px rgba(0, 0, 0, 0.5);
  transform: translateZ(0);
  transition: box-shadow 0.6s ease;

  ${TabletDevice}:hover & {
    box-shadow: 
      0 40px 100px rgba(0, 0, 0, 0.7),
      0 0 0 8px #1a1a1a,
      0 0 0 10px #333,
      0 0 30px rgba(212, 175, 55, 0.2),
      inset 0 0 20px rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
  }
`;

const TabletScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  transform: translateZ(20px);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
`;

const MobileDevice = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 9/19.5;
  transform-style: preserve-3d;
  animation: 
    ${mobileReveal} 1s ease-out 0.3s forwards,
    ${floatMobile} 5s ease-in-out infinite 1.3s;
  margin: 0 auto;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;

  &:hover {
    transform: rotateY(15deg) rotateX(5deg) translateY(-12px);
    animation: none;
  }

  @media (max-width: 1200px) {
    max-width: 320px;
  }

  @media (hover: none) {
    &:active {
      transform: rotateY(15deg) rotateX(5deg) scale(0.98);
    }
  }
`;

const MobileFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 36px;
  padding: 14px;
  box-shadow: 
    0 25px 60px rgba(0, 0, 0, 0.6),
    0 0 0 6px #1a1a1a,
    0 0 0 8px #333,
    inset 0 0 15px rgba(0, 0, 0, 0.5);
  transform: translateZ(0);
  transition: box-shadow 0.6s ease;

  ${MobileDevice}:hover & {
    box-shadow: 
      0 35px 80px rgba(0, 0, 0, 0.8),
      0 0 0 6px #1a1a1a,
      0 0 0 8px #333,
      0 0 25px rgba(212, 175, 55, 0.2),
      inset 0 0 15px rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 22px;
    background: #000;
    border-radius: 0 0 16px 16px;
    z-index: 10;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 4px;
    background: #333;
    border-radius: 2px;
    z-index: 11;
  }
`;

const MobileScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 28px;
  overflow: hidden;
  transform: translateZ(20px);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const VideoCard = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  transition: transform 0.8s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.3s linear;
  will-change: transform, opacity;

  &.video-two {
    z-index: 2;
    transform: translateY(100%);
    opacity: 0;
  }
`;

const YouTubeIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: auto;
  transition: transform 0.5s ease;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: ${controlReveal} 1s 3.5s ease-in both;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const ControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.7em 1.8em;
  border: 1px solid rgba(212, 175, 55, 0.5);
  border-radius: 2rem;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #d4af37 0%, #c9920e 100%);
  color: #000;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: transparent;
    color: #d4af37;
    border-color: #d4af37;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.6em 1.4em;
    font-size: 14px;
  }
`;

const YoutubePodcastShowcase = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const tabletRef = useRef(null);
  const mobileRef = useRef(null);
  const autoplayInterval = useRef(null);
  const total = videos.length;

  const getCurrentVideos = () => {
    const tabletVideo = tabletRef.current?.querySelector('.video-one')?.getAttribute('data-video-id') || videos[0].id;
    const mobileVideo = mobileRef.current?.querySelector('.video-one')?.getAttribute('data-video-id') || videos[1].id;
    return [tabletVideo, mobileVideo];
  };

  const whenTransitionEnd = (el, timeout = 1000) => {
    return new Promise<void>((resolve) => {
      let done = false;
      const timer = setTimeout(() => {
        if (!done) resolve();
        done = true;
      }, timeout + 200);

      const handler = (e) => {
        if (done) return;
        if (e.target === el && e.propertyName === 'transform') {
          done = true;
          clearTimeout(timer);
          el.removeEventListener('transitionend', handler);
          resolve();
        }
      };

      el.addEventListener('transitionend', handler);
    });
  };

  useEffect(() => {
    const startAutoplay = setTimeout(() => {
      autoplayInterval.current = setInterval(() => {
        slide('next');
      }, 10000);
    }, 3000);

    return () => {
      clearTimeout(startAutoplay);
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    };
  }, []);

  const slide = async (direction = 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = setInterval(() => {
        slide('next');
      }, 10000);
    }

    const [tabletVideoId, mobileVideoId] = getCurrentVideos();
    const tabletIndex = videos.findIndex(v => v.id === tabletVideoId);
    const mobileIndex = videos.findIndex(v => v.id === mobileVideoId);

    let newTabletIndex, newMobileIndex;

    if (direction === 'next') {
      newTabletIndex = (tabletIndex + 1) % total;
      newMobileIndex = (mobileIndex + 1) % total;
    } else {
      newTabletIndex = (tabletIndex - 1 + total) % total;
      newMobileIndex = (mobileIndex - 1 + total) % total;
    }

    const newTabletVideo = videos[newTabletIndex];
    const newMobileVideo = videos[newMobileIndex];

    const devices = [
      { ref: tabletRef, video: newTabletVideo },
      { ref: mobileRef, video: newMobileVideo }
    ];

    devices.forEach(({ ref, video }) => {
      if (!ref.current) return;
      const videoTwo = ref.current.querySelector('.video-two');
      if (!videoTwo) return;

      videoTwo.setAttribute('data-video-id', video.id);
      const iframe = videoTwo.querySelector('.youtube-iframe');

      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.videoId}`;
      }

      videoTwo.style.transition = 'none';
      videoTwo.style.transform = direction === 'next' ? 'translateY(100%)' : 'translateY(-100%)';
      videoTwo.style.opacity = '1';
      videoTwo.style.zIndex = '2';
    });

    void document.body.offsetHeight;

    devices.forEach(({ ref }) => {
      if (!ref.current) return;
      const videoTwo = ref.current.querySelector('.video-two');
      if (!videoTwo) return;
      
      videoTwo.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.9, 0.2, 1)';
      videoTwo.style.transform = 'translateY(0)';
    });

    await Promise.all(
      devices
        .filter(({ ref }) => ref.current)
        .map(({ ref }) => whenTransitionEnd(ref.current.querySelector('.video-two'), 800))
    );

    devices.forEach(({ ref, video }) => {
      if (!ref.current) return;
      const videoOne = ref.current.querySelector('.video-one');
      const videoTwo = ref.current.querySelector('.video-two');
      
      if (videoOne && videoTwo) {
        videoOne.setAttribute('data-video-id', video.id);
        const iframeOne = videoOne.querySelector('.youtube-iframe');
        const iframeTwo = videoTwo.querySelector('.youtube-iframe');

        if (iframeOne && iframeTwo) {
          iframeOne.src = iframeTwo.src;
        }
      }
    });

    devices.forEach(({ ref }) => {
      if (!ref.current) return;
      const videoTwo = ref.current.querySelector('.video-two');
      if (!videoTwo) return;
      
      videoTwo.style.transition = 'none';
      videoTwo.style.transform = direction === 'next' ? 'translateY(100%)' : 'translateY(-100%)';
      videoTwo.style.opacity = '0';
      videoTwo.style.zIndex = '2';
    });

    void document.body.offsetHeight;
    setIsAnimating(false);
  };

  return (
    <PageWrapper>
      <HeroSection>
        <LeftColumn>
          <ContentArea>
            <Badge>Content That Transforms</Badge>
            
            <Heading>
              <span className="highlight">Wisdom</span> in Motion
            </Heading>
            
            <Caption>
              From startup frameworks to digital mastery each episode delivers actionable insights 
              that founders, CEOs, and creators use to scale their impact.
            </Caption>

            <StatsContainer>
              <StatBox delay="2s">
                <StatNumber>15M+</StatNumber>
                <StatLabel>Total Views</StatLabel>
              </StatBox>
              <StatBox delay="2.2s">
                <StatNumber>100K+</StatNumber>
                <StatLabel>Subscribers</StatLabel>
              </StatBox>
              <StatBox delay="2.4s">
                <StatNumber>100K+</StatNumber>
                <StatLabel>Monthly Views</StatLabel>
              </StatBox>
            </StatsContainer>
          </ContentArea>

          <CTASection>
            <CTATitle>Ready to Transform Your Business?</CTATitle>
            <CTAText>
              Subscribe and join 100K+ founders learning strategies that actually work.
            </CTAText>
            <CTAButton 
              href="https://www.youtube.com/@Sujeetgovindani" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit YouTube Channel
            </CTAButton>
          </CTASection>
        </LeftColumn>

        <RightColumn>
          <DevicesArea>
            <TabletDevice ref={tabletRef}>
              <TabletFrame>
                <TabletScreen>
                  <VideoContainer>
                    <VideoCard className="video-one" data-video-id={videos[0].id}>
                      <YouTubeIframe 
                        className="youtube-iframe"
                        src={`https://www.youtube.com/embed/${videos[0].videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videos[0].videoId}`}
                        title={videos[0].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </VideoCard>

                    <VideoCard className="video-two" data-video-id={videos[0].id}>
                      <YouTubeIframe 
                        className="youtube-iframe"
                        src={`https://www.youtube.com/embed/${videos[0].videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videos[0].videoId}`}
                        title={videos[0].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </VideoCard>
                  </VideoContainer>
                </TabletScreen>
              </TabletFrame>
            </TabletDevice>

            <MobileDevice ref={mobileRef}>
              <MobileFrame>
                <MobileScreen>
                  <VideoContainer>
                    <VideoCard className="video-one" data-video-id={videos[1].id}>
                      <YouTubeIframe 
                        className="youtube-iframe"
                        src={`https://www.youtube.com/embed/${videos[1].videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videos[1].videoId}`}
                        title={videos[1].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </VideoCard>

                    <VideoCard className="video-two" data-video-id={videos[1].id}>
                      <YouTubeIframe 
                        className="youtube-iframe"
                        src={`https://www.youtube.com/embed/${videos[1].videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videos[1].videoId}`}
                        title={videos[1].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </VideoCard>
                  </VideoContainer>
                </MobileScreen>
              </MobileFrame>
            </MobileDevice>
          </DevicesArea>

          <Controls>
            <ControlButton onClick={() => slide('prev')} disabled={isAnimating}>
              ← Previous
            </ControlButton>
            <ControlButton onClick={() => slide('next')} disabled={isAnimating}>
              Next →
            </ControlButton>
          </Controls>
        </RightColumn>
      </HeroSection>
    </PageWrapper>
  );
};

export default YoutubePodcastShowcase;