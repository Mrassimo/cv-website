import React from 'react';

// Generic Icon Wrapper
const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        {props.children}
    </svg>
);

// UI Icons
export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" /></Icon>
);
export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 7.758a.75.75 0 00-1.06 1.061l1.59 1.59a.75.75 0 001.06-1.06l-1.59-1.59z"/></Icon>
);
export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.818 2.06-7.174 5.168-8.972a.75.75 0 01.819.162z"/></Icon>
);
export const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M2.25 6.163v11.674a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V6.163l-9.75 5.656a.75.75 0 01-.75-.001L2.25 6.163z"/><path d="M21.75 4.5c0-.414-.336-.75-.75-.75h-18a.75.75 0 00-.75.75v.093l9.375 5.441a1.5 1.5 0 001.5 0L21.75 4.593V4.5z"/></Icon>
);
export const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 116.5 4.75a1.75 1.75 0 010 3.5zM19 19h-3v-4.74c0-1.42-.6-2.13-1.82-2.13a1.9 1.9 0 00-2 1.88V19h-3v-9h3v1.38h.04a2.79 2.79 0 012.58-1.4c1.86 0 3.18 1.21 3.18 3.86V19z"/></Icon>
);
export const AiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.21 1.002l-1.022 1.933a.874.874 0 00.342 1.255l3.242 1.621a.874.874 0 001.255-.342l1.022-1.933a2.25 2.25 0 01-.21-1.002V3.104M14.25 3.104a2.25 2.25 0 00-4.5 0v5.714a2.25 2.25 0 00.42 1.414l1.022 1.933a.874.874 0 01-1.255.342L8.683 12.33a.874.874 0 01-1.255-.342l-1.022-1.933A2.25 2.25 0 004.5 8.818V3.104a2.25 2.25 0 00-4.5 0v5.714a2.25 2.25 0 001.212 2.024l1.022 1.933a.874.874 0 001.255.342l3.242 1.621a.874.874 0 00.894 0l3.242-1.621a.874.874 0 001.255-.342l1.022-1.933a2.25 2.25 0 001.212-2.024V3.104a2.25 2.25 0 00-4.5 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 21a2.25 2.25 0 004.5 0v-5.714a2.25 2.25 0 00-1.212-2.024l-1.022-1.933a.874.874 0 00-1.255-.342L12.32 12.33a.874.874 0 00-.894 0l-3.242-1.621a.874.874 0 00-1.255.342L5.908 13.07a2.25 2.25 0 00-1.212 2.024v5.714a2.25 2.25 0 004.5 0v-5.714a2.25 2.25 0 01.21-1.002l1.022-1.933a.874.874 0 011.255-.342l3.242 1.621a.874.874 0 01.894 0l3.242-1.621a.874.874 0 011.255.342l1.022 1.933a2.25 2.25 0 01.21 1.002v5.714z" /></Icon>
);
export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></Icon>
);
export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>
);

// Concept Icons
export const BlueprintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m-5-1.5l1 1.5m0 0l.5 1.5m-5-1.5l.5 1.5m7.5-3l-4.5-6.75L6.25 12m11.5 0L12 5.25 6.25 12" fill="none" stroke="currentColor" /></Icon>
);
export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a6.01 6.01 0 00-3.75 0M3.75 12h16.5c.621 0 1.125-.504 1.125-1.125V6.75c0-.621-.504-1.125-1.125-1.125H3.75c-.621 0-1.125.504-1.125 1.125v4.125c0 .621.504 1.125 1.125 1.125z" fill="none" stroke="currentColor"/></Icon>
);
export const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 8.25h9m-9 3H12m2.25 2.25H12m2.25-2.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM15 21a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM5.25 5.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" fill="none" stroke="currentColor"/></Icon>
);
export const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} strokeWidth="1.5" stroke="currentColor" fill="none"><path d="M9.528 1.718a.75.75 0 01.162.819A9.97 9.97 0 009 6a9.97 9.97 0 00-3.463-.69.75.75 0 01-.981.98 11.503 11.503 0 00-3.213 4.09 1.5 1.5 0 00-.825 1.375 1.5 1.5 0 001.5 1.5h14.25a1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-.825-1.375 11.503 11.503 0 00-3.213-4.09.75.75 0 01-.981-.98 9.97 9.97 0 00-3.463.69.75.75 0 01-.819-.162z" /><path d="M11.25 15.52v2.25a1.5 1.5 0 001.5 1.5h.375a1.5 1.5 0 001.5-1.5v-2.25m-3.375 0c1.18 1.283 2.19 1.283 3.375 0" /></Icon>
);
export const SpaceshipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} strokeWidth="1.5" stroke="currentColor" fill="none"><path d="M15.59 14.37a6.06 6.06 0 01-5.84 7.48 6.06 6.06 0 01-7.48-5.84 6.06 6.06 0 015.84-7.48 6.06 6.06 0 017.48 5.84z" /><path d="M12 12l9 3-9-9-3 9 3-3z" /></Icon>
);
export const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" /></Icon>
);

// Project Icons
export const LlmBiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"><path d="M32 54C43.0467 54 52 45.0467 52 34C52 22.9533 43.0467 14 32 14C20.9533 14 12 22.9533 12 34C12 45.0467 20.9533 54 32 54Z" strokeOpacity="0.5"/><path d="M32 44C37.5228 44 42 39.5228 42 34C42 28.4772 37.5228 24 32 24C26.4772 24 22 28.4772 22 34C22 39.5228 26.4772 44 32 44Z"/><path d="M32 14V10"/><path d="M32 58V54"/><path d="M18 34H14"/><path d="M50 34H46"/><path d="M22.0498 24.0498L19.2218 21.2218"/><path d="M44.7783 41.9502L41.9503 44.7782"/><path d="M22.0498 44.7782L19.2218 41.9502"/><path d="M44.7783 21.2218L41.9503 24.0498"/><path d="M6 18L16 28"/><path d="M6 34H16"/><path d="M6 50L16 40"/></Icon>
);
export const GeocodingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"><path d="M32 44C37.5228 44 42 39.5228 42 34C42 28.4772 37.5228 24 32 24C26.4772 24 22 28.4772 22 34C22 39.5228 26.4772 44 32 44Z" /><path d="M32 58C22.0588 58 14 50.9412 14 41C14 34.0055 22.0305 20.1504 32 10C41.9695 20.1504 50 34.0055 50 41C50 50.9412 41.9412 58 32 58Z" strokeOpacity="0.5"/><path d="M24 18L14 14" strokeOpacity="0.5"/><path d="M40 18L50 14" strokeOpacity="0.5"/><path d="M18 50L10 54" strokeOpacity="0.5"/><path d="M46 50L54 54" strokeOpacity="0.5"/></Icon>
);
export const AhgdIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="20" cy="20" r="8" strokeOpacity="0.5"/><circle cx="44" cy="20" r="8" strokeOpacity="0.5"/><circle cx="32" cy="44" r="8" strokeOpacity="0.5"/><path d="M26 24L28 36"/><path d="M38 24L36 36"/><path d="M23 20H41"/><path d="M20 28L32 38"/><path d="M44 28L32 38"/><path d="M32 24V12" /><path d="M32 24H40"/><path d="M32 24H24"/></Icon>
);

// Company Logos
export const HcfIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8V9h3V5h2v4h3v4h-3v4h-2z"/></Icon>);
export const WestpacIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props} viewBox="0 0 24 24"><path d="M3 13.01V11h5.79l2.4-7.21L15 15.26l-1.9-.95-2.2-4.4-3.2 9.6h7.3L18 21H3v-7.99zM21 11h-5.79l-2.4 7.21L9 6.74l1.9.95 2.2 4.4 3.2-9.6H8L5 3h16v7.99z"/></Icon>);
export const MedibankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></Icon>);
export const CbaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18.02c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 6l-5 3.5V17l5 3.5 5-3.5V9.5L12 6zm0 2.31L15.92 11 12 13.69 8.08 11 12 8.31zM11 14.43l4-2.31v4.62l-4 2.31v-4.62zm1 4.88l4-2.31v-4.62l-4 2.31v4.62z"/></Icon>);
export const NdiaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 15.24L12 13.5l-4.24 4.24-1.41-1.41L10.59 12 6.34 7.76l1.41-1.41L12 10.59l4.24-4.24 1.41 1.41L13.41 12l4.24 4.24-1.41 1.41z"/></Icon>);


// Technology Icons
export const SnowflakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l-2 3.5-3.5 2 3.5 2 2 3.5 2-3.5 3.5-2-3.5-2L12 2zm0 0v20m-5-9.5l-2-1.5 2-1.5m10 3l-2-1.5 2-1.5m-5 9.5l-2 1.5 2 1.5m0-19l-2 1.5 2 1.5" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const AWSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></Icon>);
export const DbtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a5.25 5.25 0 015.25 5.25H6.75a5.25 5.25 0 015.25-5.25zM12 6.75v-4.5m0 16.5v-4.5m0-7.5a5.25 5.25 0 00-5.25 5.25h10.5a5.25 5.25 0 00-5.25-5.25z" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const AirflowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-6h6m-9-6a9 9 0 1118 0 9 9 0 01-18 0z" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const PolarsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const PythonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const SQLIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0h1.5m1.5 0v-1.5m12 1.5v-1.5m0 0a3.75 3.75 0 00-7.5 0m7.5 0a3.75 3.75 0 01-7.5 0M4.5 12v-1.5" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const LangchainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const RAGIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5m-16.5-8.25h16.5m-16.5 12h16.5m-16.5 3.75h16.5M3.75 3.75h16.5" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const TensorflowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" fill="none" stroke="currentColor" strokeWidth={1.5} /><path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5a2.5 2.5 0 015 0V12a2.5 2.5 0 01-5 0V9.5z" fill="none" stroke="currentColor" strokeWidth={1.5} /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v3.5" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const LookerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v18h18V3H3.75zm8.25 9a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const TableauIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const PowerBIIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l3-3m0 0l3 3m-3-3v6m9-10.5l-3 3m0 0l-3-3m3 3v6" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const AgileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-5.234-4.266-9.5-9.5-9.5S.5 6.766.5 12s4.266 9.5 9.5 9.5 9.5-4.266 9.5-9.5z" fill="none" stroke="currentColor" strokeWidth={1.5} /><path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25l-4.5 7.5-2.25-3" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const JiraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5m6 6H6.75a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h6.75" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const GitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const DockerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5" fill="none" stroke="currentColor" strokeWidth={1.5} /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5 7.5 7.5-7.5" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const VercelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const SupabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5-7.5 7.5-7.5-7.5z" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);
export const CanvaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.083.935 2.083 2.083s-.935 2.083-2.083 2.083-2.083-.935-2.083-2.083.935-2.083 2.083-2.083z" fill="none" stroke="currentColor" strokeWidth={1.5} /><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" fill="none" stroke="currentColor" strokeWidth={1.5} /></Icon>);