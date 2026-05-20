import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronDown, ArrowUp, Maximize2, Minimize2 } from "lucide-react";
import Page from "../../components/Page";
import { useTheme } from "../../components/JUI/Theme";

const accordionData = [
  {
    title: "Information Collection",
    content: "We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us."
  },
  {
    title: "Cookies & Tracking",
    content: "We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice."
  },
  {
    title: "Payment Information",
    content: "We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor."
  },
  {
    title: "Data Usage",
    content: "We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. We use the information we collect or receive to facilitate account creation, authentication, and booking management."
  },
  {
    title: "Third Party Sharing",
    content: "We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. This includes payment processing, data analysis, email delivery, hosting services, and customer service."
  },
  {
    title: "Security",
    content: "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure."
  },
  {
    title: "User Rights",
    content: "Depending on your location, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request to our support team."
  }
];

const AccordionItem = ({ item, isOpen, onClick, themeTokens }) => {
  const { FG, M, B, A, BG } = themeTokens;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ 
        marginBottom: "16px",
        borderRadius: "12px",
        border: isOpen ? `1px solid rgba(0, 151, 178, 0.4)` : `1px solid ${B}`,
        boxShadow: isOpen ? "0 4px 20px rgba(0, 151, 178, 0.08)" : (isHovered ? "0 4px 12px rgba(0,0,0,0.03)" : "none"),
        overflow: "hidden",
        background: isOpen ? BG : (isHovered ? "rgba(0,0,0,0.02)" : BG),
        transition: "all 0.3s ease"
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 32px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          outline: "none"
        }}
      >
        <span style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", fontWeight: isOpen ? 600 : 500, color: isOpen ? A : FG, transition: "color 0.3s ease" }}>
          {item.title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", color: isOpen ? A : M }}
        >
          <ChevronDown size={22} strokeWidth={isOpen ? 2 : 1.5} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ padding: "0px 32px 32px 32px", color: M, fontSize: "1.1rem", lineHeight: 1.9 }}>
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PrivacyPolicy = () => {
  const { tokens } = useTheme();
  const [openIndices, setOpenIndices] = useState([0]);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleAccordion = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter(i => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const expandAll = () => {
    setOpenIndices(accordionData.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndices([]);
  };

  return (
    <Page>
      <Helmet>
        <title>Privacy Policy | Little Known Planet</title>
        <meta name="description" content="Review the Privacy Policy for using Little Known Planet services." />
      </Helmet>
      
      {/* Top Progress Bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: tokens.A,
          transformOrigin: "0%",
          scaleX,
          zIndex: 9999
        }}
      />

      <div style={{ background: tokens.BG, minHeight: "100vh", paddingTop: "140px", paddingBottom: "120px", color: tokens.FG }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h1 className="font-display" style={{ 
              fontSize: "clamp(3.5rem, 7vw, 5.5rem)", 
              fontWeight: 400, 
              color: tokens.A, 
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              fontFamily: "Georgia, serif"
            }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: "1.1rem", color: tokens.M, maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
              How we collect, use, and protect your information.
              Last updated: May 2026.
            </p>
            
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndices.includes(index)}
                onClick={() => toggleAccordion(index)}
                themeTokens={tokens}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={goToTop}
            style={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid rgba(0, 151, 178, 0.2)`,
              color: tokens.A,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              transition: "transform 0.2s ease"
            }}
            whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(0, 151, 178, 0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={24} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default PrivacyPolicy;
