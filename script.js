  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let current = 0;
    setInterval(() => {
      heroSlides[current].classList.remove('active');
      current = (current + 1) % heroSlides.length;
      heroSlides[current].classList.add('active');
    }, 5000);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.wow').forEach(el => observer.observe(el));

  const sf = document.querySelector('.sf');
  window.addEventListener('scroll', () => {
    sf.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  const IF = 'https://www.imagefoundry.co.uk';
  const LI = 'https://www.imagefoundry.co.uk/lp/images';

  const panels = {
    industry: {
      heading: 'Industries',
      body: 'Explore the industries Image Foundry are transforming.',
      grid: [
        { label:'Interiors', img:`${LI}/industry/interiors-living-room.jpeg`, href:`${IF}/industry/interiors/` },
        { label:'Bathrooms', img:`${LI}/industry/bathroom-basin.jpg`,         href:`${IF}/industry/bathrooms/` },
        { label:'Products',  img:`${LI}/industry/product-shot.png`,           href:`${IF}/industry/product/` },
        { label:'Kitchens',  img:`${LI}/industry/kitchen-interior.jpg`,       href:`${IF}/industry/kitchen/` },
        { label:'Bedrooms',  img:`${LI}/industry/bedroom-interior.jpeg`,      href:`${IF}/industry/bedrooms/` },
        { label:'Property',  img:`${LI}/industry/property-exterior.jpeg`,     href:`${IF}/industry/property/` },
      ]
    },
    about: {
      heading: 'Who We Are',
      body: 'Over 20 years of CGI expertise, working with the UK\'s leading product manufacturers and housebuilders.',
      grid: [
        { label:'Our Story',    img:`${LI}/gallery/door-black-georgian-dusk.jpeg`, href:`${IF}/about-us/` },
        { label:'Our Process',  img:`${LI}/gallery/gallery-home-office.jpeg`,      href:`${IF}/process/` },
        { label:'Get in Touch', img:`${LI}/industry/bathroom-basin.jpg`,           href:`${IF}/contact-us/` },
      ]
    },
    cases: {
      heading: 'Case Studies',
      body: 'Real projects, real results.',
      grid: [
        { label:'Strata Homes',    img:`${LI}/gallery/gallery-cgi-ai-3a.png`,          href:`${IF}/case-studies/` },
        { label:'Ideal Standard',  img:`${LI}/gallery/gallery-bathroom-marble.jpeg`,    href:`${IF}/case-studies/` },
        { label:'Irsap Radiators', img:`${LI}/gallery/radiator-living-room.png`,        href:`${IF}/case-studies/` },
        { label:'Franke Kitchen',  img:`${LI}/gallery/gallery-kitchen-appliances.jpeg`, href:`${IF}/case-studies/` },
        { label:'Outdoor Living',  img:`${LI}/gallery/outdoor-decking.png`,             href:`${IF}/case-studies/` },
        { label:'External Doors',  img:`${LI}/colourways/colourway-red.jpg`,            href:`${IF}/case-studies/` },
      ]
    },
    insights: {
      heading: 'Insights & Ideas',
      body: 'Practical thinking on CGI, AI imagery, and what\'s changing in product visualisation.',
      grid: [
        { label:'CGI vs Photography', img:`${LI}/gallery/gallery-cgi-ai-4a.png`, href:`${IF}/insights/` },
        { label:'AI in Production',   img:`${LI}/gallery/gallery-cgi-ai-4b.png`, href:`${IF}/insights/` },
        { label:'Colourway Imaging',  img:`${LI}/colourways/colourway-teal.png`, href:`${IF}/insights/` },
      ]
    },
    process: {
      heading: 'How We Work',
      body: 'A CGI-first, AI-extended methodology built on 20 years of expertise.',
      grid: [
        { label:'Range Audit',        img:`${LI}/gallery/door-black-georgian-dusk.jpeg`, href:`${IF}/process/` },
        { label:'3D Master Build',    img:`${LI}/gallery/gallery-home-office.jpeg`,      href:`${IF}/process/` },
        { label:'AI Scene Placement', img:`${LI}/gallery/outdoor-decking.png`,           href:`${IF}/process/` },
      ]
    },
    contact: {
      heading: 'Start the Conversation',
      body: 'Tell us about your project and we\'ll show you exactly what\'s possible.',
      grid: [
        { label:'Get in Touch', img:`${LI}/colourways/colourway-red.jpg`,   href:`${IF}/contact-us/` },
        { label:'Book a Call',  img:`${LI}/colourways/colourway-blue.jpeg`, href:`${IF}/contact-us/` },
        { label:'See Our Work', img:`${LI}/colourways/colourway-oak.png`,   href:`${IF}/contact-us/` },
      ]
    }
  };

  function renderPanel(key) {
    const d  = panels[key];
    const el = document.getElementById('navContentPanel');
    if (!d) { el.innerHTML = ''; return; }
    el.innerHTML = `
      <div class="ncp-header">
        <h2 class="ncp-heading">${d.heading}</h2>
        <p class="ncp-body">${d.body}</p>
      </div>
      <div class="ncp-grid">
        ${d.grid.map(i=>`
          <a class="ncp-item" href="${i.href}">
            <img src="${i.img}" alt="${i.label}" loading="lazy"/>
            <span class="ncp-item-label">${i.label}</span>
          </a>`).join('')}
      </div>`;
  }

  document.querySelectorAll('.nav-links li a').forEach(a => {
    a.addEventListener('click', e => {
      if (a.dataset.key === 'industry') {
        e.preventDefault();
        document.querySelectorAll('.nav-links li a').forEach(l => l.classList.remove('is-active'));
        a.classList.add('is-active');
        renderPanel('industry');
      }
    });
  });

  function openNav() {
    document.body.classList.add('nav-open');
    const def = document.querySelector('.nav-links li a[data-key="industry"]');
    document.querySelectorAll('.nav-links li a').forEach(l => l.classList.remove('is-active'));
    if (def) def.classList.add('is-active');
    renderPanel('industry');
  }
  function closeNav() { document.body.classList.remove('nav-open'); }

  document.querySelector('.sf-burger').addEventListener('click', () => {
    document.body.classList.contains('nav-open') ? closeNav() : openNav();
  });
  document.getElementById('navClose').addEventListener('click', closeNav);
  document.addEventListener('keyup', e => { if (e.key === 'Escape') closeNav(); });
