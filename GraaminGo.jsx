import { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    nav: { home: "Home", howItWorks: "How It Works", rates: "Rates", partner: "Partner Portal", register: "Register", bookNow: "Book Now" },
    hero: {
      badge: "Rural Emergency Transit · Pilot: Divli, PIN 321406",
      headline1: "Your Village.",
      headline2: "One Call.",
      headline3: "One Network.",
      sub: "Emergency rides, mandi transport and school drops — verified drivers, fixed prices, no surprises.",
      book: "Book Now", driver: "Register as Sarathi",
      trust1: "Verified by Panchayat", trust2: "No Emergency Tax", trust3: "Fixed Fare Always",
    },
    problem: {
      title: "The 45–90 Minute Emergency Gap", sub: "When every minute matters, rural India waits.",
      latency: { title: "Latency Gap", desc: "Nearest ambulance or vehicle is 45–90 minutes away. Every minute of delay can mean the difference between life and irreversible harm." },
      trust: { title: "Trust Gap", desc: "Unverified strangers. No ID check, no rate agreement. Villagers pay whatever is demanded in a moment of desperation." },
      resource: { title: "Resource Gap", desc: "Vehicles exist in the village but no system connects them. Tractors, Boleros, and bikes sit idle while families panic." },
      stat1: "Villages Lack Ambulance Access", stat2: "Avg Emergency Response Time", stat3: "Cases Reach Hospital Too Late",
    },
    how: {
      title: "How Graamin Go Works", sub: "Three steps. No app needed. Works on any phone.",
      s1t: "Submit Request", s1d: "Call, WhatsApp, or use this form. Tell us your village, destination, and urgency level.",
      s2t: "Dispatcher Finds Nearest Vehicle", s2d: "Our dispatcher pings verified Sarathis in your cluster. First YES locks the job — no bidding.",
      s3t: "Fixed Price · Verified Driver · Receipt", s3d: "Pre-agreed fare. Government-verified driver. Digital receipt on WhatsApp. No Emergency Tax. Ever.",
      tag: "No Emergency Tax · No Surge Pricing · Ever",
    },
    rates: {
      title: "Digital Rate Card", sub: "Fair and Pre-Agreed Pricing — Publicly Visible, Panchayat-Approved",
      from: "From", to: "To", km: "Distance", bike: "Bike", suv: "SUV/Bolero", pickup: "Pickup", type: "Type",
      banner: "All prices are fixed. Approved by local Panchayat. No surge. No negotiation.",
    },
    book: {
      title: "Book a Ride / SOS Request", sub: "Works without an app. Response within minutes.",
      name: "Full Name", village: "Your Village", dest: "Destination", need: "Need Type", urgency: "Urgency Level",
      submit: "Submit Request", needs: ["Medical Emergency","Mandi Transport","School Drop","Personal Travel"],
      urgencies: ["Normal","High","Critical – SOS"],
      success: "Request submitted. Dispatcher will contact you within 5 minutes via WhatsApp.",
    },
    sarathi: {
      title: "Register as Sarathi", sub: "Join the network. Set your availability. Keep 100% of every fare.",
      name: "Full Name", village: "Home Village", vehicle: "Vehicle Type", capacity: "Passenger Capacity",
      dl: "Upload Driving Licence", rc: "Upload RC Book", emergency: "Available for Emergency Calls",
      submit: "Submit Registration", vehicles: ["Bike","SUV / Bolero","Pickup Truck","Tractor","JCB / Heavy"],
      success: "Registration received. Verification within 48 hours. Status: Pending",
      sub2: "Flat monthly fee · Keep 100% fare · Verified badge · Renewal reminders",
    },
    avail: {
      title: "Check Network Availability", sub: "Enter your village pincode to view active drivers and service coverage in your area.",
      pinLabel: "Village Pincode", pinPlaceholder: "Enter 6-digit pincode", checkBtn: "Check Availability",
      drivers: "Active Drivers", bikes: "Bikes", suvs: "SUV / Bolero", tractors: "Tractors", status: "Coverage Status",
    },
    village: {
      title: "Register Your Village", sub: "Create a nodal hub. Become a Graamin Go Cluster.",
      panchayat: "Panchayat / Village Name", block: "Block / Tehsil", district: "District", pin: "PIN Code",
      lead: "Lead Sarathi Name", phone: "Lead Sarathi Phone", drivers: "Estimated Drivers in Village",
      submit: "Register Village Cluster", success: "Village registered. Your Cluster ID will be shared within 24 hours.",
    },
  },
  hi: {
    nav: { home: "होम", howItWorks: "कैसे काम करता है", rates: "दरें", partner: "पार्टनर पोर्टल", register: "पंजीकरण", bookNow: "बुक करें" },
    hero: {
      badge: "ग्रामीण आपातकालीन परिवहन · पायलट: दिवली, पिन 321406",
      headline1: "आपका गाँव।", headline2: "एक संपर्क।", headline3: "एक नेटवर्क।",
      sub: "आपातकालीन सवारी, मंडी परिवहन और स्कूल ड्रॉप — सत्यापित चालक, निश्चित दरें।",
      book: "अभी बुक करें", driver: "सारथी के रूप में पंजीकरण",
      trust1: "पंचायत द्वारा सत्यापित", trust2: "कोई आपातकालीन टैक्स नहीं", trust3: "हमेशा निश्चित किराया",
    },
    problem: {
      title: "45–90 मिनट की आपातकालीन खाई", sub: "जब हर मिनट मायने रखता है, ग्रामीण भारत इंतज़ार करता है।",
      latency: { title: "विलंब की खाई", desc: "निकटतम एम्बुलेंस 45–90 मिनट दूर है। हर मिनट की देरी जीवन और अपूरणीय नुकसान के बीच का फर्क हो सकती है।" },
      trust: { title: "विश्वास की खाई", desc: "असत्यापित अजनबी, कोई ID जांच नहीं, कोई दर समझौता नहीं। संकट में जो मांगा जाए वह देना पड़ता है।" },
      resource: { title: "संसाधन की खाई", desc: "गाँव में वाहन हैं लेकिन उन्हें जोड़ने की कोई प्रणाली नहीं। ट्रैक्टर और बाइक खड़ी रहती हैं।" },
      stat1: "गाँवों में एम्बुलेंस नहीं", stat2: "औसत आपातकालीन प्रतिक्रिया", stat3: "देर से अस्पताल पहुंचने के मामले",
    },
    how: {
      title: "ग्रामीण गो कैसे काम करता है", sub: "तीन कदम। कोई ऐप नहीं। किसी भी फोन पर।",
      s1t: "अनुरोध दर्ज करें", s1d: "कॉल, WhatsApp या फॉर्म से गाँव, गंतव्य और तात्कालिकता बताएं।",
      s2t: "डिस्पैचर निकटतम वाहन ढूंढता है", s2d: "पहला YES काम लॉक करता है — कोई बोली नहीं।",
      s3t: "निश्चित मूल्य · सत्यापित चालक · रसीद", s3d: "पूर्व-सहमत किराया, WhatsApp पर रसीद। कोई आपातकालीन टैक्स नहीं।",
      tag: "कोई आपातकालीन टैक्स नहीं · कभी सर्ज नहीं",
    },
    rates: {
      title: "डिजिटल दर कार्ड", sub: "उचित और पूर्व-सहमत मूल्य — पंचायत-अनुमोदित",
      from: "गाँव से", to: "तक", km: "दूरी", bike: "बाइक", suv: "SUV/बोलेरो", pickup: "पिकअप", type: "प्रकार",
      banner: "सभी मूल्य निश्चित। पंचायत-अनुमोदित। कोई सर्ज नहीं।",
    },
    book: {
      title: "सवारी बुक / SOS अनुरोध", sub: "बिना ऐप के। मिनटों में प्रतिक्रिया।",
      name: "पूरा नाम", village: "गाँव", dest: "गंतव्य", need: "आवश्यकता", urgency: "तात्कालिकता",
      submit: "अनुरोध दर्ज करें", needs: ["चिकित्सा आपातकाल","मंडी परिवहन","स्कूल ड्रॉप","व्यक्तिगत यात्रा"],
      urgencies: ["सामान्य","उच्च","अत्यावश्यक – SOS"],
      success: "अनुरोध दर्ज। डिस्पैचर 5 मिनट में WhatsApp पर संपर्क करेगा।",
    },
    sarathi: {
      title: "सारथी के रूप में पंजीकरण", sub: "नेटवर्क से जुड़ें। हर किराए का 100% रखें।",
      name: "पूरा नाम", village: "गृह गाँव", vehicle: "वाहन प्रकार", capacity: "यात्री क्षमता",
      dl: "ड्राइविंग लाइसेंस", rc: "RC बुक", emergency: "आपातकालीन कॉल के लिए उपलब्ध",
      submit: "पंजीकरण दर्ज करें", vehicles: ["बाइक","SUV / बोलेरो","पिकअप ट्रक","ट्रैक्टर","JCB"],
      success: "पंजीकरण प्राप्त। 48 घंटे में सत्यापन। स्थिति: लंबित",
      sub2: "मासिक फ्लैट शुल्क · 100% किराया · सत्यापित बैज",
    },
    avail: {
      title: "नेटवर्क उपलब्धता जांचें", sub: "अपने क्षेत्र में सक्रिय चालक और कवरेज देखने के लिए पिनकोड दर्ज करें।",
      pinLabel: "गाँव पिनकोड", pinPlaceholder: "6-अंकीय पिनकोड", checkBtn: "उपलब्धता जांचें",
      drivers: "सक्रिय चालक", bikes: "बाइक", suvs: "SUV / बोलेरो", tractors: "ट्रैक्टर", status: "कवरेज स्थिति",
    },
    village: {
      title: "अपना गाँव पंजीकृत करें", sub: "एक नोडल हब बनाएं। ग्रामीण गो क्लस्टर बनें।",
      panchayat: "पंचायत / गाँव", block: "ब्लॉक / तहसील", district: "जिला", pin: "पिन कोड",
      lead: "लीड सारथी नाम", phone: "लीड सारथी फोन", drivers: "अनुमानित चालक",
      submit: "क्लस्टर पंजीकृत करें", success: "गाँव पंजीकृत। 24 घंटे में क्लस्टर ID मिलेगा।",
    },
  },
};

const rateData = [
  { from:"Divli", to:"Bharatpur", km:"18 km", bike:"₹90", suv:"₹270", pickup:"₹360", type:"General" },
  { from:"Divli", to:"Bayana", km:"12 km", bike:"₹60", suv:"₹180", pickup:"₹240", type:"General" },
  { from:"Divli", to:"Agra", km:"65 km", bike:"—", suv:"₹975", pickup:"₹1,300", type:"Emergency" },
  { from:"Divli", to:"Mathura", km:"48 km", bike:"₹240", suv:"₹720", pickup:"₹960", type:"Mandi" },
  { from:"Divli", to:"Nearest Hospital", km:"Actual KM", bike:"₹5/km", suv:"₹15/km", pickup:"₹20/km", type:"SOS Fixed" },
  { from:"Any Village", to:"District HQ", km:"Actual KM", bike:"₹5/km", suv:"₹15/km", pickup:"₹20/km", type:"General" },
];

function AnimCounter({ target, suffix="" }) {
  const [val,setVal]=useState(0); const ref=useRef();
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){let s=0;const step=target/55;const t=setInterval(()=>{s+=step;if(s>=target){setVal(target);clearInterval(t);}else setVal(Math.floor(s));},18);obs.disconnect();}
    });
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Logo({size=40}){
  return(
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="38" fill="url(#lg2)" stroke="#3E7D0F" strokeWidth="2"/>
      <path d="M20 52 Q30 30 40 28 Q50 26 58 38 Q62 44 60 52" stroke="#F5F3E8" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M15 52 Q25 44 35 48 Q45 52 55 46 Q63 42 65 52" stroke="#C78112" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="40" cy="28" r="5" fill="#C78112"/>
      <path d="M38 28 L38 48 M42 28 L42 48" stroke="#F5F3E8" strokeWidth="1.5"/>
      <ellipse cx="40" cy="56" rx="22" ry="4" fill="#3E7D0F" opacity="0.4"/>
      <defs><linearGradient id="lg2" x1="0" y1="0" x2="80" y2="80"><stop stopColor="#5DA110"/><stop offset="1" stopColor="#3E7D0F"/></linearGradient></defs>
    </svg>
  );
}

const Ic={
  clock:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:26,height:26}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  shield:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:26,height:26}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  truck:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:26,height:26}}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  phone:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:24,height:24}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>,
  bolt:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:24,height:24}}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  check2:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:24,height:24}}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  check:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:15,height:15}}><polyline points="20 6 9 17 4 12"/></svg>,
  upload:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
  search:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  menu:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:24,height:24}}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:24,height:24}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

export default function GraaminGo() {
  const [lang,setLang]=useState("en");
  const [mob,setMob]=useState(false);
  const [tab,setTab]=useState("book");
  const [bk,setBk]=useState({name:"",village:"",dest:"",need:"",urgency:""});
  const [bkOk,setBkOk]=useState(false);
  const [sr,setSr]=useState({name:"",village:"",vehicle:"",capacity:"",emergency:false});
  const [srOk,setSrOk]=useState(false);
  const [vl,setVl]=useState({panchayat:"",block:"",district:"",pin:"",lead:"",phone:"",drivers:""});
  const [vlOk,setVlOk]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [pin,setPin]=useState("");
  const [avRes,setAvRes]=useState(null);
  const [pf,setPf]=useState({name:"",phone:"",village:"",pin:"",block:"",district:"",exp:""});
  const [pfOk,setPfOk]=useState(false);

  const t=translations[lang];
  const hi=lang==="hi";
  const hf=hi?"'Noto Sans Devanagari',sans-serif":"'Poppins','Inter',sans-serif";
  const bf=hi?"'Noto Sans Devanagari',sans-serif":"'Inter','Segoe UI',sans-serif";

  useEffect(()=>{ const h=()=>setScrolled(window.scrollY>55); window.addEventListener("scroll",h); return()=>window.removeEventListener("scroll",h); },[]);
  const go=(id)=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMob(false); };

  const checkAvail=(e)=>{ e.preventDefault(); setAvRes(pin.trim()==="321406"?{ok:true,drivers:12,bikes:5,suvs:4,tractors:3,zone:"Divli Cluster · Pilot Zone",coverage:hi?"पूर्ण कवरेज":"Full Coverage"}:{ok:false,coverage:hi?"अभी उपलब्ध नहीं":"Not Yet Covered",zone:hi?"विस्तार योजना में":"Expansion Planned"}); };

  const submit=(setter,okSetter,e)=>{ e.preventDefault(); okSetter(true); setTimeout(()=>okSetter(false),5000); };

  return(
    <div style={{fontFamily:bf,background:"#F5F3E8",color:"#1C2B0E",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}body{overflow-x:hidden}
        .mw{max-width:1100px;margin:0 auto}
        .mw-md{max-width:860px;margin:0 auto}
        .mw-sm{max-width:680px;margin:0 auto}
        .hf{font-family:${hf}}
        .sec-title{font-family:${hf};font-size:clamp(23px,3.2vw,34px);font-weight:800;color:#1C2B0E;line-height:1.22}
        .partner-title{font-family:${hf};font-size:clamp(20px,2.6vw,28px);font-weight:700;color:#1C2B0E;line-height:1.28}
        .body{font-size:14.5px;line-height:1.74;color:#4A5E30}
        .lbl{display:block;font-size:11.5px;font-weight:700;color:#5DA110;letter-spacing:.5px;text-transform:uppercase;margin-bottom:5px}
        .inp{width:100%;padding:11px 13px;border:1.5px solid #CEC9A8;border-radius:9px;background:#fff;font-size:14px;color:#1C2B0E;outline:none;transition:border-color .18s;font-family:inherit}
        .inp:focus{border-color:#5DA110;box-shadow:0 0 0 3px rgba(93,161,16,.1)}
        .sel{-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%235DA110' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:34px}
        .bg{background:linear-gradient(135deg,#5DA110,#3E7D0F);color:#fff;border:none;border-radius:10px;font-weight:700;padding:12px 24px;font-size:14px;cursor:pointer;transition:all .18s;box-shadow:0 4px 14px rgba(61,125,15,.28);font-family:inherit}
        .bg:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(61,125,15,.38)}
        .bo{background:linear-gradient(135deg,#C78112,#D99220);color:#fff;border:none;border-radius:10px;font-weight:700;padding:12px 24px;font-size:14px;cursor:pointer;transition:all .18s;box-shadow:0 4px 14px rgba(199,129,18,.28);font-family:inherit}
        .bo:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(199,129,18,.4)}
        .bw{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.55);border-radius:10px;font-weight:600;padding:11px 24px;font-size:14px;cursor:pointer;transition:all .18s;font-family:inherit}
        .bw:hover{background:rgba(255,255,255,.1);border-color:#fff}
        .bdark{background:#1C2B0E;color:#fff;border:none;border-radius:8px;font-weight:700;padding:13px 30px;font-size:14.5px;cursor:pointer;transition:all .2s;font-family:inherit;letter-spacing:.15px}
        .bdark:hover{background:#3E7D0F}
        .glass{background:rgba(255,255,255,.68);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);box-shadow:0 6px 28px rgba(61,125,15,.09),0 2px 6px rgba(0,0,0,.04)}
        .wcard{background:#fff;border:1px solid #E6E1C8;border-radius:13px;box-shadow:0 2px 10px rgba(0,0,0,.045)}
        .pcard{background:#fff;border:1px solid #DDD8BF;border-radius:12px;padding:26px}
        .nl{background:none;border:none;cursor:pointer;font-size:13.5px;font-weight:600;color:#3E7D0F;padding:6px 11px;border-radius:7px;transition:all .15s;font-family:inherit}
        .nl:hover{background:rgba(93,161,16,.1)}
        .tgl{display:flex;border:1.5px solid #5DA110;border-radius:8px;overflow:hidden}
        .tb{padding:6px 14px;font-size:12.5px;font-weight:700;border:none;cursor:pointer;font-family:inherit;transition:all .15s}
        .ton{background:#5DA110;color:#fff} .toff{background:transparent;color:#5DA110}
        .stab{padding:9px 19px;border-radius:9px;border:1.5px solid transparent;cursor:pointer;font-weight:600;font-size:13.5px;transition:all .18s;background:transparent;font-family:inherit}
        .stabon{background:#5DA110;color:#fff;box-shadow:0 3px 11px rgba(93,161,16,.27)}
        .staboff{color:#3E7D0F;border-color:#BDD99A}
        .staboff:hover{border-color:#5DA110;background:rgba(93,161,16,.06)}
        .tpill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.17);border:1px solid rgba(255,255,255,.32);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#fff;backdrop-filter:blur(8px)}
        .pcard-feat{display:flex;gap:11px;align-items:flex-start;padding:11px 0;border-bottom:1px solid #F2EDD8}
        .pcard-feat:last-child{border-bottom:none}
        .dot-g{width:7px;height:7px;border-radius:50%;background:#5DA110;margin-top:7px;flex-shrink:0}
        .dot-gr{width:6px;height:6px;border-radius:50%;background:#B8B29A;margin-top:8px;flex-shrink:0}
        .sub-head{font-size:11px;font-weight:700;color:#9E9880;letter-spacing:.7px;text-transform:uppercase;margin-bottom:9px;margin-top:4px}
        .ok-box{background:linear-gradient(135deg,#EAF8D5,#D2EDAC);border:1.5px solid #5DA110;border-radius:11px;padding:15px 18px;color:#2A5208;font-weight:600;text-align:center;font-size:14.5px}
        .sw{position:relative;display:inline-block;width:46px;height:25px;cursor:pointer}
        .sw input{opacity:0;width:0;height:0}
        .sl{position:absolute;inset:0;border-radius:25px;background:#D4CFA8;transition:.3s}
        .sl::before{content:'';position:absolute;width:19px;height:19px;border-radius:50%;background:#fff;left:3px;top:3px;transition:.3s;box-shadow:0 2px 5px rgba(0,0,0,.18)}
        .sw input:checked+.sl{background:#5DA110}
        .sw input:checked+.sl::before{transform:translateX(21px)}
        .up-zone{border:2px dashed #C0D99A;border-radius:9px;padding:18px;text-align:center;cursor:pointer;background:rgba(93,161,16,.03);transition:all .18s}
        .up-zone:hover{border-color:#5DA110;background:rgba(93,161,16,.06)}
        .rt{width:100%;border-collapse:separate;border-spacing:0;font-size:13.5px}
        .rt th{background:#3E7D0F;color:#fff;padding:11px 13px;text-align:left;font-weight:600;font-size:11.5px;letter-spacing:.5px}
        .rt th:first-child{border-radius:10px 0 0 0}.rt th:last-child{border-radius:0 10px 0 0}
        .rt td{padding:11px 13px;border-bottom:1px solid rgba(93,161,16,.09)}
        .rt tr:last-child td{border-bottom:none}
        .rt tr:nth-child(odd) td{background:rgba(93,161,16,.03)}
        .rt tr:hover td{background:rgba(93,161,16,.08)}
        .pill{display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:.4px}
        .prosper{background:linear-gradient(135deg,#182A09,#243D0E);color:#fff;border-radius:13px;padding:26px}
        .pstat{border-left:3px solid rgba(93,161,16,.45);padding:9px 15px;margin-bottom:11px}
        .pstat:last-child{margin-bottom:0}
        .itag{display:inline-block;background:#EDF5E3;color:#3E7D0F;border:1px solid #C0D99A;border-radius:6px;padding:3px 10px;font-size:11.5px;font-weight:700}
        .kv{width:100%}.kv td{padding:9px 0;vertical-align:top;font-size:13px}
        .kv td:first-child{color:#999;font-weight:600;width:180px;padding-right:16px;font-size:12px}
        .avbox{background:#fff;border:1px solid #E0DCBF;border-radius:10px;padding:15px 17px}
        .section-div{height:1px;background:#E8E3CC;margin:28px 0}
        .fade{animation:fi .38s ease}
        @keyframes fi{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
        .pulse{animation:pl 2s infinite}@keyframes pl{0%,100%{opacity:1}50%{opacity:.5}}
        .hero-bg{background:linear-gradient(135deg,#1A3504 0%,#253F07 18%,#3E7D0F 48%,#5DA110 72%,#7ABD2C 88%,#C78112 100%)}
        .stat4{display:grid;grid-template-columns:repeat(2,1fr);gap:11px}
        .sbox{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.17);border-radius:12px;padding:17px 13px;text-align:center;backdrop-filter:blur(8px)}
        .pcard-section{background:#FAFAF5;border-top:1px solid #E8E3CC;border-bottom:1px solid #E8E3CC}
        .ebar{background:linear-gradient(90deg,#AD1008,#CC1E0E);color:#fff;text-align:center;padding:9px 16px;font-weight:700;font-size:12.5px;letter-spacing:.35px}
        .pc-grid{display:grid;gap:36px}
        .avail-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
        @media(max-width:768px){
          .desk{display:none!important}.c2{grid-template-columns:1fr!important}.c3{grid-template-columns:1fr!important}
          .rt{font-size:11.5px}.rt th,.rt td{padding:8px 9px}.pc-grid{grid-template-columns:1fr!important}
        }
        @media(min-width:769px){
          .mob{display:none}.c2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .c3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .stat4{grid-template-columns:repeat(4,1fr)} .pc-grid{grid-template-columns:1fr 1fr}
        }
        .nav-bar{position:sticky;top:0;z-index:50;padding:0 24px;transition:all .28s ease}
        .nav-scrolled{background:rgba(245,243,232,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(93,161,16,.14)}
      `}</style>

      {/* Emergency bar */}
      <div className="ebar">
        <span className="pulse" style={{display:"inline-block",width:7,height:7,background:"#FFA0A0",borderRadius:"50%",marginRight:8,verticalAlign:"middle"}}/>
        Emergency: +91 9899505441 &nbsp;·&nbsp; WhatsApp 24/7 &nbsp;·&nbsp; Pilot Zone: Divli, PIN 321406
      </div>

      {/* Navbar */}
      <nav className={`nav-bar${scrolled?" nav-scrolled":""}`}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>go("hero")}>
            <Logo size={40}/>
            <div><div className="hf" style={{fontSize:16,fontWeight:800,color:"#2A5208",lineHeight:1}}>Graamin Go</div><div style={{fontSize:9,color:"#5DA110",fontWeight:700,letterSpacing:".8px"}}>RURAL MOBILITY NETWORK</div></div>
          </div>
          <div className="desk" style={{display:"flex",gap:2}}>
            {[{l:t.nav.home,i:"hero"},{l:t.nav.howItWorks,i:"how"},{l:t.nav.rates,i:"rates"},{l:t.nav.partner,i:"partner"},{l:t.nav.register,i:"register"}].map(x=>(
              <button key={x.i} className="nl" onClick={()=>go(x.i)}>{x.l}</button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div className="tgl"><button className={`tb ${lang==="en"?"ton":"toff"}`} onClick={()=>setLang("en")}>EN</button><button className={`tb ${lang==="hi"?"ton":"toff"}`} onClick={()=>setLang("hi")}>हिंदी</button></div>
            <button className="bg desk" style={{padding:"8px 17px",fontSize:13}} onClick={()=>go("register")}>{t.nav.bookNow}</button>
            <button className="mob" style={{background:"none",border:"none",cursor:"pointer",color:"#3E7D0F"}} onClick={()=>setMob(true)}>{Ic.menu()}</button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mob&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.38)",zIndex:100,display:"flex",justifyContent:"flex-end"}} onClick={()=>setMob(false)}>
        <div style={{background:"#F5F3E8",width:260,height:"100%",padding:22,display:"flex",flexDirection:"column",gap:4}} onClick={e=>e.stopPropagation()}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <span className="hf" style={{fontWeight:800,color:"#2A5208",fontSize:15}}>Graamin Go</span>
            <button style={{background:"none",border:"none",cursor:"pointer",color:"#3E7D0F"}} onClick={()=>setMob(false)}>{Ic.close()}</button>
          </div>
          {[{l:t.nav.home,i:"hero"},{l:t.nav.howItWorks,i:"how"},{l:t.nav.rates,i:"rates"},{l:t.nav.partner,i:"partner"},{l:t.nav.register,i:"register"}].map(x=>(
            <button key={x.i} className="nl" style={{textAlign:"left",width:"100%",fontSize:15,padding:"11px 13px"}} onClick={()=>go(x.i)}>{x.l}</button>
          ))}
          <div style={{marginTop:"auto"}}><button className="bg" style={{width:"100%"}} onClick={()=>go("register")}>{t.nav.bookNow}</button></div>
        </div>
      </div>}

      {/* ── HERO ── */}
      <section id="hero" style={{position:"relative",overflow:"hidden",padding:"78px 24px 108px"}}>
        <div style={{position:"absolute",inset:0}}>
          <div className="hero-bg" style={{position:"absolute",inset:0}}/>
          <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",height:120}} viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0 55 Q220 18 440 60 Q660 100 880 55 Q1060 20 1280 65 Q1380 88 1440 65 L1440 120 L0 120Z" fill="#F5F3E8" opacity="0.12"/>
            <path d="M0 78 Q280 46 560 76 Q820 106 1050 72 Q1240 46 1440 78 L1440 120 L0 120Z" fill="#F5F3E8" opacity="0.22"/>
            <path d="M0 98 Q350 78 700 95 Q1000 112 1300 88 Q1390 82 1440 92 L1440 120 L0 120Z" fill="#F5F3E8" opacity="0.5"/>
            <path d="M0 112 Q420 100 840 110 Q1180 120 1440 106 L1440 120 L0 120Z" fill="#F5F3E8"/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:.045,pointerEvents:"none",overflow:"hidden"}}><Logo size={500}/></div>
        </div>
        <div style={{position:"relative",maxWidth:980,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.26)",borderRadius:100,padding:"7px 18px",marginBottom:28,backdropFilter:"blur(8px)"}}>
            <span className="pulse" style={{display:"inline-block",width:7,height:7,background:"#C78112",borderRadius:"50%"}}/>
            <span style={{color:"rgba(255,255,255,.88)",fontSize:12,fontWeight:600,letterSpacing:".6px"}}>{t.hero.badge}</span>
          </div>
          <h1 className="hf" style={{fontSize:"clamp(42px,7vw,80px)",fontWeight:900,lineHeight:1.06,color:"white",textShadow:"0 4px 24px rgba(0,0,0,.28)",marginBottom:20}}>
            {t.hero.headline1}<br/><span style={{color:"#C78112"}}>{t.hero.headline2}</span><br/>{t.hero.headline3}
          </h1>
          <p style={{fontSize:"clamp(14px,1.7vw,17px)",color:"rgba(255,255,255,.8)",maxWidth:540,margin:"0 auto 32px",lineHeight:1.68}}>{t.hero.sub}</p>
          <div style={{display:"flex",gap:11,justifyContent:"center",flexWrap:"wrap",marginBottom:32}}>
            <button className="bo" style={{fontSize:15,padding:"13px 30px"}} onClick={()=>go("register")}>{t.hero.book}</button>
            <button className="bw" style={{fontSize:15,padding:"13px 30px"}} onClick={()=>go("register")}>{t.hero.driver}</button>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:44}}>
            {[t.hero.trust1,t.hero.trust2,t.hero.trust3].map((b,i)=><div key={i} className="tpill">{b}</div>)}
          </div>
          <div className="stat4" style={{maxWidth:680,margin:"0 auto"}}>
            {[{n:12,s:"",l:hi?"सक्रिय चालक":"Active Drivers"},{n:6,s:"+",l:hi?"गाँव कवर":"Villages Covered"},{n:8,s:" min",l:hi?"औसत प्रतिक्रिया":"Avg Response"},{n:100,s:"%",l:hi?"किराया सारथी का":"Fare to Driver"}].map((s,i)=>(
              <div key={i} className="sbox"><div style={{fontSize:28,fontWeight:900,color:"#C78112"}}><AnimCounter target={s.n} suffix={s.s}/></div><div style={{fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:600,marginTop:4}}>{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVAILABILITY ── */}
      <section style={{padding:"52px 24px",background:"#EDE9D6",borderBottom:"1px solid #D5CFA8"}}>
        <div className="mw-md">
          <div style={{textAlign:"center",marginBottom:32}}>
            <h2 className="sec-title">{t.avail.title}</h2>
            <p className="body" style={{marginTop:8,maxWidth:500,margin:"8px auto 0"}}>{t.avail.sub}</p>
          </div>
          <div className="glass" style={{borderRadius:16,padding:"26px 28px"}}>
            <form onSubmit={checkAvail} style={{display:"flex",gap:11,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:210}}>
                <label className="lbl">{t.avail.pinLabel}</label>
                <div style={{position:"relative"}}>
                  <input className="inp" maxLength={6} pattern="[0-9]{6}" required placeholder={t.avail.pinPlaceholder} value={pin} onChange={e=>setPin(e.target.value)} style={{paddingLeft:38}}/>
                  <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#5DA110"}}>{Ic.search()}</span>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"flex-end"}}><button className="bg" type="submit" style={{height:44,whiteSpace:"nowrap"}}>{t.avail.checkBtn}</button></div>
            </form>
            {avRes&&<div className="fade" style={{marginTop:22}}>
              <div style={{background:avRes.ok?"rgba(93,161,16,.07)":"rgba(192,23,13,.05)",border:`1px solid ${avRes.ok?"rgba(93,161,16,.2)":"rgba(192,23,13,.2)"}`,borderRadius:11,padding:"13px 16px",marginBottom:18,display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
                <div><div style={{fontWeight:700,fontSize:13.5,color:avRes.ok?"#3E7D0F":"#C0170D"}}>{t.avail.status}: {avRes.coverage}</div><div style={{fontSize:12.5,color:"#4A5E30",marginTop:2}}>{avRes.zone}</div></div>
                <span style={{padding:"3px 12px",borderRadius:100,background:avRes.ok?"#5DA110":"#C0170D",color:"#fff",fontSize:12,fontWeight:700}}>{pin}</span>
              </div>
              {avRes.ok&&<div className="avail-grid">
                {[{n:avRes.drivers,l:t.avail.drivers},{n:avRes.bikes,l:t.avail.bikes},{n:avRes.suvs,l:t.avail.suvs},{n:avRes.tractors,l:t.avail.tractors}].map((a,i)=>(
                  <div key={i} className="avbox"><div style={{fontSize:30,fontWeight:900,color:"#5DA110"}}>{a.n}</div><div style={{fontSize:12,color:"#4A5E30",fontWeight:600,marginTop:3}}>{a.l}</div></div>
                ))}
              </div>}
              {!avRes.ok&&<div style={{textAlign:"center",padding:"14px 0",color:"#888",fontSize:14}}>
                {hi?"यह पिनकोड अभी नेटवर्क में नहीं है। गाँव पंजीकरण करें।":"This pincode is not yet in our network. Register your village to bring Graamin Go to your area."}
                <br/><button className="bg" style={{marginTop:13,fontSize:12.5}} onClick={()=>{setTab("village");go("register");}}>{hi?"अपना गाँव पंजीकृत करें":"Register Your Village"}</button>
              </div>}
            </div>}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" style={{padding:"68px 24px",background:"#F5F3E8"}}>
        <div className="mw">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{display:"inline-block",background:"rgba(192,23,13,.07)",border:"1px solid rgba(192,23,13,.17)",borderRadius:7,padding:"4px 13px",marginBottom:13}}><span style={{color:"#C0170D",fontSize:11,fontWeight:700,letterSpacing:"1px"}}>THE CRISIS</span></div>
            <h2 className="sec-title">{t.problem.title}</h2>
            <p className="body" style={{marginTop:9}}>{t.problem.sub}</p>
          </div>
          <div className="c3" style={{gap:18,marginBottom:36}}>
            {[{d:t.problem.latency,I:Ic.clock,c:"#C0170D",bg:"rgba(192,23,13,.07)"},{d:t.problem.trust,I:Ic.shield,c:"#C78112",bg:"rgba(199,129,18,.07)"},{d:t.problem.resource,I:Ic.truck,c:"#5DA110",bg:"rgba(93,161,16,.07)"}].map((item,i)=>(
              <div key={i} className="wcard" style={{padding:26,transition:"transform .2s,box-shadow .2s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 28px rgba(61,125,15,.12)"}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
                <div style={{width:48,height:48,borderRadius:12,background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:item.c}}>{item.I()}</div>
                <h3 className="hf" style={{fontSize:17,fontWeight:800,marginBottom:9}}>{item.d.title}</h3>
                <p style={{fontSize:13.5,color:"#4A5E30",lineHeight:1.72}}>{item.d.desc}</p>
              </div>
            ))}
          </div>
          <div style={{background:"linear-gradient(135deg,#1A3504,#3E7D0F)",borderRadius:16,padding:"28px 32px",display:"grid",gap:20,textAlign:"center"}} className="c3">
            {[{n:68,s:"%",l:t.problem.stat1},{n:67,s:" min",l:t.problem.stat2},{n:33,s:"%",l:t.problem.stat3}].map((s,i)=>(
              <div key={i}><div style={{fontSize:44,fontWeight:900,color:"#C78112"}}><AnimCounter target={s.n} suffix={s.s}/></div><div style={{fontSize:13,color:"rgba(255,255,255,.78)",marginTop:5}}>{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW ── */}
      <section id="how" style={{padding:"68px 24px",background:"#EDE9D6"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:50}}>
            <h2 className="sec-title">{t.how.title}</h2>
            <p className="body" style={{marginTop:9}}>{t.how.sub}</p>
          </div>
          <div className="c3" style={{gap:22}}>
            {[{n:"01",t:t.how.s1t,d:t.how.s1d,I:Ic.phone,c:"#5DA110"},{n:"02",t:t.how.s2t,d:t.how.s2d,I:Ic.bolt,c:"#C78112"},{n:"03",t:t.how.s3t,d:t.how.s3d,I:Ic.check2,c:"#3E7D0F"}].map((step,i)=>(
              <div key={i} style={{position:"relative"}}>
                <div className="glass" style={{borderRadius:17,padding:26,height:"100%"}}>
                  <div style={{position:"absolute",top:-13,left:18,background:`linear-gradient(135deg,${step.c},${step.c}BB)`,color:"#fff",borderRadius:8,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:hf,fontWeight:900,fontSize:13,boxShadow:`0 4px 11px ${step.c}44`}}>{step.n}</div>
                  <div style={{marginTop:16}}><div style={{color:step.c,marginBottom:12}}>{step.I()}</div><h3 className="hf" style={{fontSize:16,fontWeight:800,marginBottom:9}}>{step.t}</h3><p style={{fontSize:13.5,color:"#4A5E30",lineHeight:1.7}}>{step.d}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:32,background:"linear-gradient(135deg,#C78112,#D99220)",borderRadius:11,padding:"15px 22px",textAlign:"center",boxShadow:"0 5px 18px rgba(199,129,18,.26)"}}>
            <span style={{color:"#fff",fontWeight:800,fontSize:15}}>{t.how.tag}</span>
          </div>
        </div>
      </section>

      {/* ── RATES ── */}
      <section id="rates" style={{padding:"68px 24px",background:"#F5F3E8"}}>
        <div className="mw">
          <div style={{textAlign:"center",marginBottom:36}}>
            <h2 className="sec-title">{t.rates.title}</h2>
            <p className="body" style={{marginTop:8}}>{t.rates.sub}</p>
          </div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"linear-gradient(135deg,#5DA110,#3E7D0F)",color:"#fff",borderRadius:100,padding:"7px 18px",fontWeight:700,fontSize:12.5,boxShadow:"0 4px 13px rgba(61,125,15,.26)"}}>
              <div style={{color:"rgba(255,255,255,.85)"}}>{Ic.check()}</div>
              {hi?"पंचायत-अनुमोदित · शून्य सर्ज":"Panchayat-Approved · Zero Surge · Fixed Rates"}
            </div>
          </div>
          <div className="glass" style={{borderRadius:15,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}>
              <table className="rt">
                <thead><tr><th>{t.rates.from}</th><th>{t.rates.to}</th><th>{t.rates.km}</th><th>{t.rates.bike}</th><th>{t.rates.suv}</th><th>{t.rates.pickup}</th><th>{t.rates.type}</th></tr></thead>
                <tbody>{rateData.map((row,i)=>(
                  <tr key={i}>
                    <td style={{fontWeight:600}}>{row.from}</td><td>{row.to}</td><td style={{color:"#4A5E30"}}>{row.km}</td>
                    <td style={{color:"#5DA110",fontWeight:700}}>{row.bike}</td><td style={{color:"#3E7D0F",fontWeight:700}}>{row.suv}</td><td style={{color:"#6B3F16",fontWeight:700}}>{row.pickup}</td>
                    <td><span className="pill" style={{background:row.type==="Emergency"||row.type==="SOS Fixed"?"rgba(192,23,13,.1)":row.type==="Mandi"?"rgba(199,129,18,.1)":"rgba(93,161,16,.1)",color:row.type==="Emergency"||row.type==="SOS Fixed"?"#C0170D":row.type==="Mandi"?"#C78112":"#3E7D0F"}}>{row.type}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div style={{padding:"11px 16px",background:"rgba(93,161,16,.04)",borderTop:"1px solid rgba(93,161,16,.09)",textAlign:"center"}}>
              <span style={{fontSize:12.5,color:"#3E7D0F",fontWeight:600}}>{t.rates.banner}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* VILLAGE MOBILITY PARTNER PORTAL */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section id="partner" className="pcard-section" style={{padding:"72px 24px"}}>
        <div className="mw">

          {/* Programme header */}
          <div style={{borderBottom:"2px solid #E4DFC4",paddingBottom:26,marginBottom:40}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#5DA110",letterSpacing:".8px",textTransform:"uppercase",marginBottom:8}}>Graamin Go · Structured Programme</div>
                <h2 className="partner-title">Village Mobility Partner Portal</h2>
                <p style={{fontSize:15,color:"#7A8A60",marginTop:7,fontStyle:"italic",fontWeight:500}}>Enable Mobility. Lead Development.</p>
              </div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
                <span className="itag">By Application Only</span>
                <span className="itag">Pincode-Based Access</span>
              </div>
            </div>
          </div>

          <div className="pc-grid" style={{alignItems:"start"}}>

            {/* ── LEFT: Programme content ── */}
            <div>

              {/* Overview */}
              <div className="pcard" style={{marginBottom:20}}>
                <h3 className="hf" style={{fontSize:15,fontWeight:700,color:"#1C2B0E",marginBottom:13,paddingBottom:10,borderBottom:"1px solid #EFE9D0"}}>Overview</h3>
                <p style={{fontSize:14,color:"#4A5E30",lineHeight:1.8}}>
                  This portal is designed for responsible individuals who wish to take direct ownership of improving transport connectivity within their native village. Upon registering with a valid village pincode and completing the verification process, partners receive access to a personal operational dashboard through which they can manage local rural mobility activity — including driver onboarding, fare coordination, and service oversight — on behalf of their community.
                </p>
              </div>

              {/* Key Features */}
              <div className="pcard" style={{marginBottom:20}}>
                <h3 className="hf" style={{fontSize:15,fontWeight:700,color:"#1C2B0E",marginBottom:16,paddingBottom:10,borderBottom:"1px solid #EFE9D0"}}>Key Features</h3>

                <div style={{marginBottom:18}}>
                  <div className="sub-head">Access and Registration</div>
                  {["Pincode-based registration for village-level network access","Personal dashboard access granted after admin approval","Real-time view of network availability and active driver status in the assigned village"].map((f,i)=>(
                    <div key={i} className="pcard-feat"><div className="dot-g"/><span style={{fontSize:13.5,color:"#2A3A18",lineHeight:1.66}}>{f}</span></div>
                  ))}
                </div>

                <div style={{marginBottom:18}}>
                  <div className="sub-head">Driver Registration Module</div>
                  {["Driving licence upload and identity verification","Vehicle ownership classification — Owned or Rented","Vehicle category selection — Car, Bike, Tractor, Agricultural Equipment"].map((f,i)=>(
                    <div key={i} className="pcard-feat"><div className="dot-g"/><span style={{fontSize:13.5,color:"#2A3A18",lineHeight:1.66}}>{f}</span></div>
                  ))}
                </div>

                <div style={{marginBottom:18}}>
                  <div className="sub-head">Admin-Controlled Pricing Dashboard</div>
                  <p style={{fontSize:13,color:"#7A8A60",marginBottom:10,lineHeight:1.62}}>Rates are set by platform admin and displayed transparently within the partner dashboard. Service categories covered:</p>
                  {["Car","Bike","Owned Tractor","Rented Tractor","Ploughing and Agricultural Services"].map((f,i)=>(
                    <div key={i} className="pcard-feat"><div className="dot-gr"/><span style={{fontSize:13.5,color:"#2A3A18"}}>{f}</span></div>
                  ))}
                </div>

                <div style={{background:"#F5F2E8",border:"1px solid #DDD8BE",borderRadius:9,padding:"14px 15px",marginBottom:18}}>
                  <div className="sub-head" style={{marginBottom:7}}>Commission Structure</div>
                  <p style={{fontSize:13.5,color:"#2A3A18",lineHeight:1.72}}>Graamin Go retains a <strong style={{color:"#3E7D0F"}}>15% platform commission</strong> per completed service transaction. The remaining 85% is credited directly to the driver. This structure is fixed, transparent, and displayed at all times within the partner dashboard.</p>
                </div>

                <div>
                  <div className="sub-head">Prosper Balance — Dashboard Section</div>
                  <div className="prosper">
                    <div style={{fontSize:12.5,color:"rgba(255,255,255,.55)",marginBottom:18,letterSpacing:".3px"}}>Village activity summary · Updated in real time</div>
                    {[{k:"Total Transactions",v:"Cumulative count of completed services in the village cluster"},{k:"Driver Earnings",v:"Aggregate payouts across all registered drivers"},{k:"Platform Commission",v:"15% retained per completed transaction"},{k:"Net Village Activity",v:"Total fare value generated by the cluster"}].map((row,i)=>(
                      <div key={i} className="pstat">
                        <div style={{fontSize:10.5,color:"rgba(93,161,16,.78)",fontWeight:700,letterSpacing:".6px",textTransform:"uppercase"}}>{row.k}</div>
                        <div style={{fontSize:13,color:"rgba(255,255,255,.78)",marginTop:3,lineHeight:1.5}}>{row.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="pcard">
                <h3 className="hf" style={{fontSize:15,fontWeight:700,color:"#1C2B0E",marginBottom:16,paddingBottom:10,borderBottom:"1px solid #EFE9D0"}}>Partner Responsibilities</h3>
                {["Register and verify local drivers within the assigned village cluster","Coordinate emergency transport requests and farm logistics in a timely manner","Ensure complete pricing transparency with both drivers and passengers","Maintain structured and timely communication with the Graamin Go dispatcher network","Oversee village-level transport operations and report any anomalies to the platform admin"].map((r,i)=>(
                  <div key={i} className="pcard-feat">
                    <div style={{width:21,height:21,borderRadius:6,background:"rgba(93,161,16,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"#5DA110",flexShrink:0}}>{Ic.check()}</div>
                    <span style={{fontSize:13.5,color:"#2A3A18",lineHeight:1.68}}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Application form ── */}
            <div style={{position:"sticky",top:84}}>
              <div className="pcard" style={{border:"1.5px solid #C0D99A"}}>
                <div style={{marginBottom:22,paddingBottom:17,borderBottom:"1px solid #EFE9D0"}}>
                  <div style={{fontSize:10.5,fontWeight:700,color:"#5DA110",letterSpacing:".8px",textTransform:"uppercase",marginBottom:5}}>Apply for Partnership</div>
                  <h3 className="hf" style={{fontSize:17,fontWeight:800,color:"#1C2B0E"}}>Village Mobility Partner</h3>
                  <p style={{fontSize:12.5,color:"#7A8A60",marginTop:6,lineHeight:1.62}}>Applications are reviewed within 5 business days. Approval depends on village coverage requirements and applicant background.</p>
                </div>
                {pfOk?<div className="ok-box fade">Application received. Our team will contact you within 5 business days for verification and onboarding.</div>:(
                  <form onSubmit={(e)=>{e.preventDefault();setPfOk(true);setTimeout(()=>setPfOk(false),6000);}} style={{display:"flex",flexDirection:"column",gap:14}}>
                    <div><label className="lbl">Full Name</label><input className="inp" required placeholder="As on government ID" value={pf.name} onChange={e=>setPf({...pf,name:e.target.value})}/></div>
                    <div><label className="lbl">Mobile Number</label><input className="inp" required type="tel" placeholder="+91 XXXXX XXXXX" value={pf.phone} onChange={e=>setPf({...pf,phone:e.target.value})}/></div>
                    <div><label className="lbl">Village Name</label><input className="inp" required placeholder="Your native village" value={pf.village} onChange={e=>setPf({...pf,village:e.target.value})}/></div>
                    <div className="c2">
                      <div><label className="lbl">Village Pincode</label><input className="inp" required maxLength={6} pattern="[0-9]{6}" placeholder="321406" value={pf.pin} onChange={e=>setPf({...pf,pin:e.target.value})}/></div>
                      <div><label className="lbl">Block / Tehsil</label><input className="inp" required value={pf.block} onChange={e=>setPf({...pf,block:e.target.value})}/></div>
                    </div>
                    <div><label className="lbl">District</label><input className="inp" required value={pf.district} onChange={e=>setPf({...pf,district:e.target.value})}/></div>
                    <div><label className="lbl">Relevant Experience (optional)</label><textarea className="inp" rows={3} style={{resize:"vertical"}} placeholder="Community leadership, transport work, panchayat involvement, etc." value={pf.exp} onChange={e=>setPf({...pf,exp:e.target.value})}/></div>
                    <div style={{background:"#F5F2E8",border:"1px solid #DDD8BE",borderRadius:8,padding:"11px 13px",fontSize:12,color:"#7A8A60",lineHeight:1.62}}>By applying, you agree to operate within Graamin Go network guidelines and maintain accurate records of all village-level activity.</div>
                    <button type="submit" className="bdark" style={{width:"100%",padding:"13px"}}>Apply as Village Mobility Partner</button>
                  </form>
                )}
              </div>
              <div style={{marginTop:18,background:"#EDF5E3",border:"1px solid #C0D99A",borderRadius:11,padding:"17px 18px"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#3E7D0F",letterSpacing:".5px",textTransform:"uppercase",marginBottom:11}}>Programme Summary</div>
                <table className="kv"><tbody>
                  {[["Access Model","Pincode-based village assignment"],["Commission","15% platform · 85% to driver"],["Dashboard","Personal operational panel"],["Approval Time","Up to 5 business days"],["Support","Dedicated dispatcher liaison"]].map(([k,v],i)=>(
                    <tr key={i}><td>{k}</td><td style={{color:"#1C2B0E"}}>{v}</td></tr>
                  ))}
                </tbody></table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK / SARATHI / VILLAGE REGISTER ── */}
      <section id="register" style={{padding:"68px 24px",background:"#F5F3E8"}}>
        <div className="mw-md">
          <div style={{textAlign:"center",marginBottom:32}}>
            <h2 className="sec-title">{hi?"पंजीकरण एवं बुकिंग":"Registration & Booking"}</h2>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:26,flexWrap:"wrap",justifyContent:"center"}}>
            {[{id:"book",l:hi?"सवारी बुक करें":"Book a Ride"},{id:"sarathi",l:hi?"सारथी बनें":"Become Sarathi"},{id:"village",l:hi?"गाँव पंजीकरण":"Register Village"}].map(t2=>(
              <button key={t2.id} className={`stab ${tab===t2.id?"stabon":"staboff"}`} onClick={()=>setTab(t2.id)}>{t2.l}</button>
            ))}
          </div>
          <div className="glass" style={{borderRadius:18,padding:"30px 26px"}}>

            {tab==="book"&&<div className="fade">
              <div style={{background:"rgba(192,23,13,.05)",border:"1px solid rgba(192,23,13,.14)",borderRadius:9,padding:"11px 15px",marginBottom:20,display:"flex",gap:10,alignItems:"center"}}>
                <span className="pulse" style={{display:"inline-block",width:9,height:9,background:"#C0170D",borderRadius:"50%",flexShrink:0}}/>
                <div><div style={{fontWeight:700,color:"#C0170D",fontSize:13}}>{hi?"चिकित्सा आपातकाल?":"Medical Emergency?"}</div><div style={{fontSize:12,color:"#4A5E30"}}>Select "Critical – SOS" for immediate priority dispatch</div></div>
              </div>
              <h3 className="hf" style={{fontSize:19,fontWeight:800,marginBottom:5}}>{t.book.title}</h3>
              <p className="body" style={{marginBottom:22,fontSize:13.5}}>{t.book.sub}</p>
              {bkOk?<div className="ok-box fade">{t.book.success}</div>:(
                <form onSubmit={(e)=>submit(setBk,setBkOk,e)} style={{display:"flex",flexDirection:"column",gap:14}}>
                  <div className="c2"><div><label className="lbl">{t.book.name} *</label><input className="inp" required value={bk.name} onChange={e=>setBk({...bk,name:e.target.value})}/></div><div><label className="lbl">{t.book.village} *</label><input className="inp" required value={bk.village} onChange={e=>setBk({...bk,village:e.target.value})}/></div></div>
                  <div><label className="lbl">{t.book.dest} *</label><input className="inp" required value={bk.dest} onChange={e=>setBk({...bk,dest:e.target.value})}/></div>
                  <div className="c2">
                    <div><label className="lbl">{t.book.need} *</label><select className="inp sel" required value={bk.need} onChange={e=>setBk({...bk,need:e.target.value})}><option value="">{hi?"चुनें...":"Select..."}</option>{t.book.needs.map((n,i)=><option key={i}>{n}</option>)}</select></div>
                    <div><label className="lbl">{t.book.urgency} *</label><select className="inp sel" required value={bk.urgency} onChange={e=>setBk({...bk,urgency:e.target.value})}><option value="">{hi?"चुनें...":"Select..."}</option>{t.book.urgencies.map((u,i)=><option key={i}>{u}</option>)}</select></div>
                  </div>
                  <button type="submit" className="bg" style={{width:"100%",fontSize:14.5,padding:13}}>{t.book.submit}</button>
                </form>
              )}
            </div>}

            {tab==="sarathi"&&<div className="fade">
              <div style={{background:"rgba(93,161,16,.05)",border:"1px solid rgba(93,161,16,.17)",borderRadius:9,padding:"11px 15px",marginBottom:20,textAlign:"center",fontWeight:700,color:"#2A5208",fontSize:13.5}}>{t.sarathi.sub2}</div>
              <h3 className="hf" style={{fontSize:19,fontWeight:800,marginBottom:5}}>{t.sarathi.title}</h3>
              <p className="body" style={{marginBottom:22,fontSize:13.5}}>{t.sarathi.sub}</p>
              {srOk?<div className="ok-box fade">{t.sarathi.success}</div>:(
                <form onSubmit={(e)=>submit(setSr,setSrOk,e)} style={{display:"flex",flexDirection:"column",gap:14}}>
                  <div className="c2"><div><label className="lbl">{t.sarathi.name} *</label><input className="inp" required value={sr.name} onChange={e=>setSr({...sr,name:e.target.value})}/></div><div><label className="lbl">{t.sarathi.village} *</label><input className="inp" required value={sr.village} onChange={e=>setSr({...sr,village:e.target.value})}/></div></div>
                  <div className="c2">
                    <div><label className="lbl">{t.sarathi.vehicle} *</label><select className="inp sel" required value={sr.vehicle} onChange={e=>setSr({...sr,vehicle:e.target.value})}><option value="">{hi?"चुनें...":"Select..."}</option>{t.sarathi.vehicles.map((v,i)=><option key={i}>{v}</option>)}</select></div>
                    <div><label className="lbl">{t.sarathi.capacity} *</label><input className="inp" type="number" min="1" max="20" required value={sr.capacity} onChange={e=>setSr({...sr,capacity:e.target.value})}/></div>
                  </div>
                  <div className="c2">
                    {[{l:t.sarathi.dl},{l:t.sarathi.rc}].map((f,i)=>(
                      <div key={i}><label className="lbl">{f.l}</label>
                        <div className="up-zone"><div style={{color:"#5DA110",display:"flex",justifyContent:"center",marginBottom:5}}>{Ic.upload()}</div><div style={{fontSize:12,color:"#4A5E30",fontWeight:600}}>{hi?"फ़ाइल चुनें":"Tap to upload"}</div><div style={{fontSize:11,color:"#aaa",marginTop:2}}>JPG, PNG or PDF</div></div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(93,161,16,.04)",borderRadius:9,padding:"12px 14px"}}>
                    <div><div style={{fontWeight:700,fontSize:13.5,color:"#1C2B0E"}}>{t.sarathi.emergency}</div><div style={{fontSize:12,color:"#4A5E30"}}>{hi?"24/7 आपातकालीन डिस्पैच":"24/7 emergency dispatch"}</div></div>
                    <label className="sw"><input type="checkbox" checked={sr.emergency} onChange={e=>setSr({...sr,emergency:e.target.checked})}/><span className="sl"/></label>
                  </div>
                  <button type="submit" className="bg" style={{width:"100%",fontSize:14.5,padding:13}}>{t.sarathi.submit}</button>
                </form>
              )}
            </div>}

            {tab==="village"&&<div className="fade">
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
                {[{l:hi?"क्लस्टर ID मिलेगा":"Get Cluster ID"},{l:hi?"डिस्पैचर नेटवर्क":"Dispatcher Network"},{l:hi?"लीड सारथी बैज":"Lead Sarathi Badge"}].map((b,i)=>(
                  <div key={i} style={{background:"rgba(93,161,16,.07)",border:"1px solid rgba(93,161,16,.18)",borderRadius:7,padding:"5px 11px",fontSize:12.5,fontWeight:600,color:"#3E7D0F"}}>{b.l}</div>
                ))}
              </div>
              <h3 className="hf" style={{fontSize:19,fontWeight:800,marginBottom:5}}>{t.village.title}</h3>
              <p className="body" style={{marginBottom:22,fontSize:13.5}}>{t.village.sub}</p>
              {vlOk?<div className="ok-box fade">{t.village.success}</div>:(
                <form onSubmit={(e)=>submit(setVl,setVlOk,e)} style={{display:"flex",flexDirection:"column",gap:14}}>
                  <div className="c2"><div><label className="lbl">{t.village.panchayat} *</label><input className="inp" required value={vl.panchayat} onChange={e=>setVl({...vl,panchayat:e.target.value})}/></div><div><label className="lbl">{t.village.block} *</label><input className="inp" required value={vl.block} onChange={e=>setVl({...vl,block:e.target.value})}/></div></div>
                  <div className="c2"><div><label className="lbl">{t.village.district} *</label><input className="inp" required value={vl.district} onChange={e=>setVl({...vl,district:e.target.value})}/></div><div><label className="lbl">{t.village.pin} *</label><input className="inp" required maxLength={6} pattern="[0-9]{6}" placeholder="321406" value={vl.pin} onChange={e=>setVl({...vl,pin:e.target.value})}/></div></div>
                  <div className="c2"><div><label className="lbl">{t.village.lead} *</label><input className="inp" required value={vl.lead} onChange={e=>setVl({...vl,lead:e.target.value})}/></div><div><label className="lbl">{t.village.phone} *</label><input className="inp" required type="tel" placeholder="+91 XXXXX XXXXX" value={vl.phone} onChange={e=>setVl({...vl,phone:e.target.value})}/></div></div>
                  <div><label className="lbl">{t.village.drivers}</label><input className="inp" type="number" min="1" value={vl.drivers} onChange={e=>setVl({...vl,drivers:e.target.value})}/></div>
                  <button type="submit" className="bg" style={{width:"100%",fontSize:14.5,padding:13}}>{t.village.submit}</button>
                </form>
              )}
            </div>}

          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section style={{padding:"44px 24px",background:"linear-gradient(135deg,#1A3504,#3E7D0F)"}}>
        <div style={{maxWidth:860,margin:"0 auto",textAlign:"center"}}>
          <h2 className="hf" style={{fontSize:"clamp(18px,2.8vw,26px)",fontWeight:800,color:"#fff",marginBottom:12}}>
            {hi?"स्टार रेटिंग नहीं — पंचायत प्रमाणन":"Not Star Ratings — Panchayat Certification"}
          </h2>
          <p style={{color:"rgba(255,255,255,.72)",maxWidth:520,margin:"0 auto 28px",fontSize:14,lineHeight:1.7}}>
            {hi?"हर सारथी को पंचायत और समुदाय द्वारा सत्यापित किया जाता है।":"Every Sarathi is verified by Panchayat and community endorsement — real accountability, not anonymous ratings."}
          </p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {["Verified by Panchayat","Govt. ID Check","Community Endorsed","Digital Receipt"].map((b,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:100,padding:"8px 16px",color:"#fff",fontWeight:600,fontSize:13}}>
                <div style={{color:"rgba(93,161,16,.85)"}}>{Ic.check()}</div>{b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:"#0F1A06",color:"#fff",padding:"44px 24px 24px"}}>
        <div className="mw">
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:36,marginBottom:32}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <Logo size={40}/><div><div className="hf" style={{fontSize:17,fontWeight:800}}>Graamin Go</div><div style={{fontSize:9,color:"#5DA110",fontWeight:700,letterSpacing:".8px"}}>RURAL MOBILITY NETWORK</div></div>
              </div>
              <p style={{fontSize:12.5,color:"rgba(255,255,255,.5)",lineHeight:1.72,marginBottom:11}}>
                Not Uber for villages. Community-Owned Rural Mobility Infrastructure — built for Bharat.
              </p>
              <div style={{fontSize:12,color:"#5DA110",fontWeight:600}}>Pilot Zone: Divli, Rajasthan · PIN 321406</div>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:11,color:"#C78112",marginBottom:13,letterSpacing:".8px",textTransform:"uppercase"}}>Quick Links</div>
              {[{l:"Book a Ride",i:"register"},{l:"Become Sarathi",i:"register"},{l:"Rate Card",i:"rates"},{l:"Partner Portal",i:"partner"},{l:"Register Village",i:"register"}].map((x,i)=>(
                <button key={i} onClick={()=>go(x.i)} style={{display:"block",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.5)",fontSize:13,padding:"4px 0",textAlign:"left",fontFamily:bf,transition:"color .18s"}} onMouseEnter={e=>e.target.style.color="#5DA110"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>{x.l}</button>
              ))}
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:11,color:"#C78112",marginBottom:13,letterSpacing:".8px",textTransform:"uppercase"}}>Contact</div>
              <div style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:11,padding:17}}>
                <div style={{fontSize:11.5,color:"rgba(255,255,255,.45)",marginBottom:5}}>Helpline</div>
                <div style={{fontSize:19,fontWeight:800,letterSpacing:".4px"}}>+91 9899505441</div>
                <div style={{height:1,background:"rgba(255,255,255,.07)",margin:"13px 0"}}/>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginBottom:4}}>Website</div>
                <div style={{fontSize:14.5,fontWeight:700,color:"#5DA110"}}>www.graamingo.com</div>
              </div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:18,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <div style={{fontSize:11.5,color:"rgba(255,255,255,.3)"}}>© 2024 Graamin Go. All rights reserved. Built for Bharat.</div>
            <div style={{fontSize:11.5,color:"rgba(255,255,255,.3)"}}>www.graamingo.com &nbsp;·&nbsp; +91 9899505441</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
