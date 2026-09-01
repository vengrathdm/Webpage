(() => {
  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector('#themeToggle');
  const printPage = document.querySelector('#printPage');
  const collapseButton = document.querySelector('#collapseSections');

  const savedTheme = localStorage.getItem('vengrath-theme');
  if (savedTheme === 'dark') body.classList.add('dark');

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('vengrath-theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  printPage?.addEventListener('click', () => window.print());

  collapseButton?.addEventListener('click', () => {
    const sections = [...document.querySelectorAll('main .section')];
    const shouldCollapse = !sections.every(section => section.classList.contains('collapsed'));
    sections.forEach(section => section.classList.toggle('collapsed', shouldCollapse));
    collapseButton.textContent = shouldCollapse ? 'Rozwiń sekcje' : 'Zwiń sekcje';
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });

  root.style.setProperty('--viewport-width', `${window.innerWidth}px`);
  window.addEventListener('resize', () => {
    root.style.setProperty('--viewport-width', `${window.innerWidth}px`);
  }, { passive: true });
})();
