import React from 'react';
import styles from './Background.module.css';

export default function Background() {
  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      {/* Visual treatment from supplied background_gradients image (Desktop only) */}
      <img
        src="/images/background_gradients.png"
        alt=""
        className={styles.gradientImageTreatment}
      />

      {/* Desktop Background: 5 Gradient/Light areas exactly from Figma node 19:2 (1440x900) */}
      <svg
        className={styles.gradientSvgDesktop}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Light One: Radial gradient centered at 50% 50% */}
          <radialGradient
            id="desktop_light_one_grad"
            cx="0.5"
            cy="0.5"
            r="0.5"
            fx="0.5"
            fy="0.5"
          >
            <stop offset="0%" stopColor="#777777" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#777777" stopOpacity="0" />
          </radialGradient>
          <filter id="desktop_blur_500" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="250" />
          </filter>

          {/* Light Two: Radial gradient */}
          <radialGradient
            id="desktop_light_two_grad"
            cx="0.5"
            cy="0.5"
            r="0.5"
            fx="0.5"
            fy="0.5"
          >
            <stop offset="0%" stopColor="#454545" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#454545" stopOpacity="0" />
          </radialGradient>

          {/* Light Five: Linear gradient bottom to top */}
          <linearGradient
            id="desktop_light_five_grad"
            x1="0.5"
            y1="1"
            x2="0.5"
            y2="0"
          >
            <stop offset="0%" stopColor="#050608" stopOpacity="1" />
            <stop offset="100%" stopColor="#202124" stopOpacity="0.20" />
          </linearGradient>

          {/* Light Four: Radial gradient */}
          <radialGradient
            id="desktop_light_four_grad"
            cx="0.5"
            cy="0.5"
            r="0.5"
            fx="0.5"
            fy="0.5"
          >
            <stop offset="0%" stopColor="#A0A0A0" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#A0A0A0" stopOpacity="0" />
          </radialGradient>
          <filter id="desktop_blur_50" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="25" />
          </filter>

          {/* Light Three: Linear gradient */}
          <linearGradient
            id="desktop_light_three_grad"
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="1"
          >
            <stop offset="0%" stopColor="#777777" stopOpacity="0" />
            <stop offset="50%" stopColor="#777777" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#777777" stopOpacity="1" />
          </linearGradient>
          <filter id="desktop_blur_35" x="-10%" y="-400%" width="120%" height="900%">
            <feGaussianBlur stdDeviation="17.5" />
          </filter>
        </defs>

        {/* 1. light_one (ELLIPSE) - bbox: [x:266, y:-872, w:1572, h:1649.6] */}
        <ellipse
          cx="1052"
          cy="-47.2"
          rx="786"
          ry="824.8"
          fill="url(#desktop_light_one_grad)"
          filter="url(#desktop_blur_500)"
          opacity="1"
        />

        {/* 2. light_two (ELLIPSE) - bbox: [x:500, y:100, w:1000, h:650] */}
        <ellipse
          cx="1000"
          cy="425"
          rx="500"
          ry="325"
          fill="url(#desktop_light_two_grad)"
          filter="url(#desktop_blur_500)"
          opacity="0.6"
        />

        {/* 3. light_five (RECTANGLE) - bbox: [x:0, y:518, w:1500, h:424] */}
        <rect
          x="0"
          y="518"
          width="1500"
          height="424"
          fill="url(#desktop_light_five_grad)"
          filter="url(#desktop_blur_500)"
          opacity="1"
        />

        {/* 4. light_four (ELLIPSE) - bbox: [x:467, y:518, w:1201, h:87] */}
        <ellipse
          cx="1067.5"
          cy="561.5"
          rx="600.5"
          ry="43.5"
          fill="url(#desktop_light_four_grad)"
          filter="url(#desktop_blur_50)"
          opacity="1"
        />

        {/* 5. light_three (RECTANGLE) - bbox: [x:0, y:538, w:1536, h:10] */}
        <rect
          x="0"
          y="538"
          width="1536"
          height="10"
          fill="url(#desktop_light_three_grad)"
          filter="url(#desktop_blur_35)"
          opacity="1"
        />
      </svg>

      {/* Mobile Background: 5 Gradient/Light areas EXACTLY from Figma node 123:85 (390x844) */}
      <svg
        className={styles.gradientSvgMobile}
        viewBox="738 822 390 844"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g opacity="0.6" filter="url(#filter0_f_123_85)">
          <ellipse
            cx="923.57"
            cy="1026.44"
            rx="330.525"
            ry="218.517"
            fill="url(#paint0_radial_123_85)"
          />
        </g>
        <g filter="url(#filter1_f_123_85)">
          <ellipse
            cx="1121.17"
            cy="842.8"
            rx="270.52"
            ry="375.656"
            transform="rotate(36.1835 1121.17 842.8)"
            fill="url(#paint1_radial_123_85)"
          />
        </g>
        <g filter="url(#filter2_f_123_85)">
          <rect
            x="515.039"
            y="1278.96"
            width="817.062"
            height="461.035"
            fill="url(#paint2_linear_123_85)"
          />
        </g>
        <g filter="url(#filter3_f_123_85)">
          <ellipse
            cx="966.573"
            cy="1342.96"
            rx="337.526"
            ry="11.0008"
            fill="url(#paint3_radial_123_85)"
          />
        </g>
        <g filter="url(#filter4_f_123_85)">
          <rect
            x="21.0016"
            y="1321.96"
            width="1536.12"
            height="10.0008"
            fill="url(#paint4_linear_123_85)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_123_85"
            x="93.0073"
            y="307.884"
            width="1661.13"
            height="1437.11"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_123_85" />
          </filter>
          <filter
            id="filter1_f_123_85"
            x="309.913"
            y="-0.00003"
            width="1622.52"
            height="1685.6"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_123_85" />
          </filter>
          <filter
            id="filter2_f_123_85"
            x="415.031"
            y="1178.95"
            width="1017.08"
            height="661.05"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_123_85" />
          </filter>
          <filter
            id="filter3_f_123_85"
            x="579.044"
            y="1281.96"
            width="775.059"
            height="122.009"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_123_85" />
          </filter>
          <filter
            id="filter4_f_123_85"
            x="0"
            y="1300.96"
            width="1578.12"
            height="52.0039"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="10.5" result="effect1_foregroundBlur_123_85" />
          </filter>
          <radialGradient
            id="paint0_radial_123_85"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(923.615 1026.5) rotate(90) scale(218.517 330.525)"
          >
            <stop stopColor="#454545" stopOpacity="0.3" />
            <stop offset="1" stopColor="#454545" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_123_85"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(1121.24 842.836) rotate(90) scale(375.656 270.52)"
          >
            <stop stopColor="#777777" stopOpacity="0.55" />
            <stop offset="1" stopColor="#777777" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="paint2_linear_123_85"
            x1="922.425"
            y1="1739.99"
            x2="941.509"
            y2="1279.65"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#050608" />
            <stop offset="1" stopColor="#202124" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient
            id="paint3_radial_123_85"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(966.621 1343.06) scale(337.526 11.0008)"
          >
            <stop stopColor="#A0A0A0" stopOpacity="0.3" />
            <stop offset="1" stopColor="#A0A0A0" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="paint4_linear_123_85"
            x1="789.06"
            y1="1331.96"
            x2="789.06"
            y2="1321.96"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#777777" stopOpacity="0" />
            <stop offset="0.5" stopColor="#777777" stopOpacity="0.35" />
            <stop offset="1" stopColor="#777777" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
