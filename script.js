/**
 * ACS (Accounting & Computer Solutions, Inc.) - Script
 * Figma Node: 2551:185 (Warm Editorial)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const siteHeader = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const briefingModal = document.getElementById('briefing-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const briefingForm = document.getElementById('briefing-form');
  const toastContainer = document.getElementById('toast-container');
  
  const headerBriefingBtn = document.getElementById('header-briefing-btn');
  const drawerBriefingBtn = document.getElementById('drawer-briefing-btn');
  
  // Specialty Modal Elements
  const specialtyModal = document.getElementById('specialty-modal');
  const specialtyModalCloseBtn = document.getElementById('specialty-modal-close-btn');
  const specialtyModalTitle = document.getElementById('specialty-modal-title');
  const specialtyModalDesc = document.getElementById('specialty-modal-desc');
  const specialtyModalBody = document.getElementById('specialty-modal-body');
  const specialtyBriefingTrigger = document.getElementById('specialty-briefing-trigger');

  // Specialty Data
  const specialtyDetails = {
    consulting: {
      title: 'Management Consulting & Advisory',
      desc: 'Strategic advisory, program management office (PMO) setup, and business process re-engineering for complex enterprise operations.',
      pillars: [
        'Enterprise PMO setup, governance frameworks, and executive stakeholder reporting',
        'Business Process Re-engineering (BPR) to eliminate administrative bottlenecks',
        'Change management, workforce readiness, and mission-aligned transition planning',
        'Performance metrics definition, KPI dash-boarding, and federal compliance monitoring'
      ]
    },
    financial: {
      title: 'Financial Systems & Audit Readiness',
      desc: 'Federal compliance, legacy modernization, audit preparation, and robust ERP implementation tailored for public and private sectors.',
      pillars: [
        'Federal Financial Management Improvement Act (FFMIA) and USSGL compliance',
        'ERP migration and modern financial systems integration (SAP, Oracle, CGI Momentum)',
        'Internal controls testing, remediation planning, and FIAR audit preparation',
        'Automated reconciliation, grant accounting, and federal budget execution workflows'
      ]
    },
    technology: {
      title: 'Information Technology & Cyber Modernization',
      desc: 'Secure cloud migration, cyber security postures, legacy systems integration, and reliable enterprise IT architectures.',
      pillars: [
        'FedRAMP-authorized cloud migration across AWS GovCloud and Microsoft Azure Government',
        'Zero Trust Architecture (ZTA), NIST SP 800-53, and CMMC Level 2 readiness',
        'Legacy COBOL/mainframe modernization with secure API microservices pipelines',
        'Continuous automated vulnerability scanning, DevSecOps pipelines, and SOC monitoring'
      ]
    },
    sectors: {
      title: 'Sectors & Contract Vehicles',
      desc: 'Tailored consulting vehicles designed to navigate strict state, local, and federal procurement frameworks with ease.',
      pillars: [
        'SBA 8(a) Certified Graduate & Certified HUBZone procurement advantages',
        'Small Disadvantaged Business (SDB) and Washington DC LSDBE certified partner',
        'Maryland Department of Transportation (MDOT) MBE/SDB prime & sub vehicles',
        'Expedited sole-source and competitive set-aside vehicle acquisition pathways'
      ]
    }
  };

  // 1. Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('active');
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.querySelectorAll('.mobile-nav-item').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Modal Management
  function openBriefingModal(prefillTopic = '') {
    if (prefillTopic && briefingForm) {
      const notes = document.getElementById('briefing-notes');
      if (notes && !notes.value) {
        notes.value = `Inquiring about ${prefillTopic}.`;
      }
    }
    briefingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const firstInput = briefingForm.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeBriefingModal() {
    briefingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openSpecialtyModal(domainKey) {
    const data = specialtyDetails[domainKey];
    if (!data) return;

    specialtyModalTitle.textContent = data.title;
    specialtyModalDesc.textContent = data.desc;

    let html = '<div class="practice-pillar-list">';
    data.pillars.forEach(pillar => {
      html += `
        <div class="practice-pillar-item">
          <span class="pillar-bullet">&#9670;</span>
          <span>${pillar}</span>
        </div>
      `;
    });
    html += '</div>';
    specialtyModalBody.innerHTML = html;

    specialtyModal.dataset.currentDomain = data.title;
    specialtyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSpecialtyModal() {
    specialtyModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Trigger Briefing Modal
  if (headerBriefingBtn) {
    headerBriefingBtn.addEventListener('click', () => openBriefingModal());
  }
  if (drawerBriefingBtn) {
    drawerBriefingBtn.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('active');
      openBriefingModal();
    });
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeBriefingModal);
  }

  // Trigger Specialty Modal
  document.querySelectorAll('[data-open-specialty]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const domain = button.getAttribute('data-open-specialty');
      openSpecialtyModal(domain);
    });
  });

  if (specialtyModalCloseBtn) {
    specialtyModalCloseBtn.addEventListener('click', closeSpecialtyModal);
  }

  if (specialtyBriefingTrigger) {
    specialtyBriefingTrigger.addEventListener('click', () => {
      const currentDomain = specialtyModal.dataset.currentDomain || 'Consulting Practice';
      closeSpecialtyModal();
      openBriefingModal(currentDomain);
    });
  }

  // Close modals on overlay backdrop click
  [briefingModal, specialtyModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          if (modal === briefingModal) closeBriefingModal();
          if (modal === specialtyModal) closeSpecialtyModal();
        }
      });
    }
  });

  // Close modals on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (briefingModal && briefingModal.classList.contains('active')) {
        closeBriefingModal();
      }
      if (specialtyModal && specialtyModal.classList.contains('active')) {
        closeSpecialtyModal();
      }
    }
  });

  // 4. Briefing Form Submission
  if (briefingForm) {
    briefingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('full-name').value;
      const email = document.getElementById('work-email').value;
      const org = document.getElementById('organization').value;

      closeBriefingModal();
      briefingForm.reset();

      showToast(`Thank you, ${fullName}! Your briefing request for ${org} has been scheduled. A senior partner will contact you shortly at ${email}.`);
    });
  }

  // 5. Toast System
  function showToast(message, duration = 5000) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#E07A2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }, duration);
  }
});
