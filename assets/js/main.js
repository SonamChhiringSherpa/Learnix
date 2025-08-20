/**
* Template Name: Learner
* Template URL: https://bootstrapmade.com/learner-bootstrap-course-template/
* Updated: Jul 08 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');

    pricingSwitch.addEventListener('change', function() {
      const pricingItems = container.querySelectorAll('.pricing-item');

      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

  /**
   * Bash Course Chatbot Widget (responsive, toggleable)
   * Appears on pages whose path includes "bash"
   */
  function initBashChatbot() {
    const isBashPage = /bash/i.test(window.location.pathname);
    if (!isBashPage) return;

    if (document.getElementById('bashChatToggle')) return; // already initialized

    const style = document.createElement('style');
    style.id = 'bash-chatbot-styles';
    style.textContent = `
      :root { --bc-radius: 14px; --bc-shadow: 0 18px 48px rgba(0,0,0,.18); --bc-border: 1px solid rgba(0,0,0,.06); }

      .bash-chat-toggle { position: fixed; right: 18px; bottom: calc(18px + env(safe-area-inset-bottom, 0)); width: 56px; height: 56px; border-radius: 50%; border: none; background: linear-gradient(135deg, var(--color-primary, #0d6efd), #5a8cff); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1055; box-shadow: 0 8px 24px rgba(13,110,253,.35); transition: transform .15s ease, box-shadow .2s ease; }
      .bash-chat-toggle i { font-size: 1.35rem; }
      .bash-chat-toggle:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(13,110,253,.4); }
      .bash-chat-toggle:active { transform: translateY(0); }
      .bash-chat-toggle:focus { outline: 2px solid rgba(13,110,253,.35); outline-offset: 2px; }

      .bash-chatbot { position: fixed; right: 18px; bottom: calc(86px + env(safe-area-inset-bottom, 0)); width: 380px; max-width: calc(100% - 24px); height: min(70vh, 560px); min-height: 360px; background: #fff; border-radius: var(--bc-radius); box-shadow: var(--bc-shadow); z-index: 1055; display: flex; flex-direction: column; overflow: hidden; border: var(--bc-border); opacity: 0; transform: translateY(12px) scale(.98); pointer-events: none; transition: opacity .18s ease, transform .22s ease; }
      .bash-chatbot.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

      .bash-chatbot .bc-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: linear-gradient(135deg, var(--color-primary, #0d6efd), #4c7cfb); color: #fff; }
      .bash-chatbot .bc-title { display: flex; align-items: center; gap: 8px; font-weight: 600; letter-spacing: .2px; }
      .bash-chatbot .bc-title i { font-size: 1rem; }
      .bash-chatbot .bc-close { background: rgba(255,255,255,.12); color: #fff; border: none; padding: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: background .15s ease; }
      .bash-chatbot .bc-close:hover { background: rgba(255,255,255,.2); }

      .bash-chatbot .bc-messages { flex: 1 1 auto; padding: 14px 12px 8px; overflow-y: auto; background: linear-gradient(180deg, #f7f9fc, #f3f6fb); }
      .bash-chatbot .bc-message { max-width: 85%; margin: 8px 0; padding: 10px 12px; border-radius: 14px; line-height: 1.45; font-size: .95rem; word-wrap: break-word; box-shadow: 0 2px 10px rgba(0,0,0,.04); }
      .bash-chatbot .bc-message.bot { background: #ffffff; border: 1px solid rgba(0,0,0,.05); }
      .bash-chatbot .bc-message.user { background: linear-gradient(135deg, var(--color-primary, #0d6efd), #5a8cff); color: #fff; margin-left: auto; }
      .bash-chatbot .bc-typing { display: inline-flex; align-items: center; gap: 4px; padding: 8px 12px; background: #ffffff; border: 1px solid rgba(0,0,0,.05); border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,.04); }
      .bash-chatbot .bc-typing .dot { width: 6px; height: 6px; border-radius: 50%; background: #9aa7b8; animation: bc-bounce 1s infinite ease-in-out; }
      .bash-chatbot .bc-typing .dot:nth-child(2) { animation-delay: .12s; }
      .bash-chatbot .bc-typing .dot:nth-child(3) { animation-delay: .24s; }
      @keyframes bc-bounce { 0%, 80%, 100% { transform: translateY(0); opacity: .6; } 40% { transform: translateY(-4px); opacity: 1; } }

      .bash-chatbot .bc-suggestions { display: flex; flex-wrap: wrap; gap: 6px; padding: 6px 10px 4px; background: transparent; }
      .bash-chatbot .bc-chip { border: 1px solid rgba(0,0,0,.12); background: #fff; color: #334155; padding: 6px 10px; font-size: .85rem; border-radius: 999px; cursor: pointer; transition: background .15s ease, border-color .15s ease; }
      .bash-chatbot .bc-chip:hover { background: #f1f5f9; border-color: rgba(0,0,0,.18); }

      .bash-chatbot .bc-input { display: flex; gap: 8px; padding: 10px; background: #fff; border-top: 1px solid rgba(0,0,0,.08); }
      .bash-chatbot .bc-input input { flex: 1 1 auto; border: 1px solid rgba(0,0,0,.15); border-radius: 10px; padding: 11px 12px; font-size: .95rem; outline: none; transition: border-color .15s ease, box-shadow .15s ease; }
      .bash-chatbot .bc-input input:focus { border-color: var(--color-primary, #0d6efd); box-shadow: 0 0 0 3px rgba(13,110,253,.12); }
      .bash-chatbot .bc-input button { width: 46px; border: none; border-radius: 10px; background: linear-gradient(135deg, var(--color-primary, #0d6efd), #5a8cff); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform .12s ease; }
      .bash-chatbot .bc-input button:active { transform: scale(.98); }
      .bash-chatbot .bc-input button i { font-size: 1.05rem; }

      @media (max-width: 576px) {
        .bash-chatbot { right: 12px; bottom: calc(82px + env(safe-area-inset-bottom, 0)); width: calc(100% - 24px); height: 62vh; min-height: 320px; }
        .bash-chat-toggle { right: 12px; bottom: calc(12px + env(safe-area-inset-bottom, 0)); }
      }

      @media (max-height: 620px) and (max-width: 768px) {
        .bash-chatbot { height: 58vh; min-height: 300px; }
      }

      @media print { .bash-chatbot, .bash-chat-toggle { display: none !important; } }
    `;
    document.head.appendChild(style);

    const html = `
      <div class="bash-chatbot" id="bashChatbot" aria-live="polite" aria-label="Bash chatbot" aria-hidden="true">
        <div class="bc-header">
          <div class="bc-title"><i class="bi bi-terminal"></i><span>Bash Helper</span></div>
          <button class="bc-close" type="button" aria-label="Close chatbot"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="bc-messages" id="bcMessages" role="log"></div>
        <div class="bc-suggestions" id="bcSuggestions"></div>
        <form class="bc-input" id="bcForm" autocomplete="off">
          <input id="bcInput" type="text" placeholder="Ask about Bash... e.g. permissions, grep, loops" aria-label="Ask a Bash question" />
          <button type="submit" aria-label="Send"><i class="bi bi-send-fill"></i></button>
        </form>
      </div>
      <button class="bash-chat-toggle" id="bashChatToggle" type="button" aria-label="Open Bash chatbot" aria-expanded="false"><i class="bi bi-chat-dots-fill"></i></button>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    const container = document.getElementById('bashChatbot');
    const toggleBtn = document.getElementById('bashChatToggle');
    const messagesEl = document.getElementById('bcMessages');
    const form = document.getElementById('bcForm');
    const input = document.getElementById('bcInput');
    const closeBtn = container.querySelector('.bc-close');

    function openChat() {
      container.classList.add('open');
      container.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.style.display = 'none';
      setTimeout(() => input.focus(), 0);
    }
    function closeChat() {
      container.classList.remove('open');
      container.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.style.display = 'flex';
    }
    toggleBtn.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);

    function addMessage(text, type) {
      const msg = document.createElement('div');
      msg.className = 'bc-message ' + (type === 'user' ? 'user' : 'bot');
      msg.innerHTML = text;
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function botReply(text) { addMessage(text, 'bot'); }

    function showTyping() {
      const wrap = document.createElement('div');
      wrap.className = 'bc-message bot';
      wrap.setAttribute('data-typing', 'true');
      wrap.innerHTML = '<div class="bc-typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
      messagesEl.appendChild(wrap);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return wrap;
    }
    function hideTyping(node) { if (node && node.parentNode) node.parentNode.removeChild(node); }

    function renderSuggestions() {
      const suggestions = [
        'How to list files?','What does chmod 755 mean?','Search text with grep','How to write a for loop?'
      ];
      const holder = document.getElementById('bcSuggestions');
      holder.innerHTML = '';
      suggestions.forEach(label => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'bc-chip';
        chip.textContent = label;
        chip.addEventListener('click', () => { input.value = label; input.focus(); });
        holder.appendChild(chip);
      });
    }

    // Knowledge base with simple pattern matching
    const knowledge = [
      { pattern: /(list|show).*files|\bls\b/i, answer: "Use 'ls'. Examples: 'ls -la' (hidden + long), 'ls -lh' (human sizes), 'ls -ltr' (by date)." },
      { pattern: /change.*directory|\bcd\b/i, answer: "Use 'cd PATH'. 'cd ..' up one, 'cd ~' home, 'cd -' previous." },
      { pattern: /current.*directory|where.*am i|\bpwd\b/i, answer: "'pwd' prints the current directory." },
      { pattern: /make.*directory|create.*folder|\bmkdir\b/i, answer: "'mkdir name' to create; '-p' creates parents: 'mkdir -p a/b/c'." },
      { pattern: /remove.*file|delete.*file|\brm\b/i, answer: "'rm file' removes a file; '-r' recursive for directories; '-i' prompts. Be careful with 'rm -rf'." },
      { pattern: /copy.*file|\bcp\b/i, answer: "'cp source dest'. For directories use 'cp -r'." },
      { pattern: /move|rename|\bmv\b/i, answer: "'mv old new' renames/moves files. Example: 'mv file.txt ../archive/'." },
      { pattern: /permissions|chmod|rwx|\b[0-7]{3}\b/i, answer: "'chmod 755 script.sh' => rwx r-x r-x. Values: r=4, w=2, x=1 (owner/group/others)." },
      { pattern: /owner|group|chown/i, answer: "Change owner: 'sudo chown user:group file'. Example: 'sudo chown alice:dev app.log'." },
      { pattern: /find.*file|search.*file|\bfind\b/i, answer: "Find files: 'find . -name \"*.log\" -type f'. Size/date: '-size +10M', '-mtime -1'." },
      { pattern: /search.*inside|content|\bgrep\b/i, answer: "Search in files: 'grep -R \"text\" PATH'. Flags: -i (ignore case), -n (line numbers), -E (regex)." },
      { pattern: /redirect|stdout|stderr|pipe|\|/i, answer: "Redirect: '>' overwrite, '>>' append, '2>' stderr, '2>&1' merge. Pipe with '|': 'cmd1 | cmd2'." },
      { pattern: /variables?|export|env(ironment)?/i, answer: "Variables: 'NAME=value' then use '$NAME'. Export: 'export NAME=value'." },
      { pattern: /if.*then|conditions?|\bif\b[\s\S]*\bfi\b/i, answer: "If: 'if [ condition ]; then ... elif ... else ... fi'. Example: 'if [ -f file ]; then echo exists; fi'." },
      { pattern: /loop|\bfor\b|\bwhile\b/i, answer: "For: 'for f in *.txt; do echo \"$f\"; done'. While: 'while read l; do ...; done < file'." },
      { pattern: /functions?/i, answer: "Function: 'myfn() { echo \"$1\"; }' Call with 'myfn arg'." },
      { pattern: /arrays?/i, answer: "Arrays: 'arr=(a b c)'; use '${arr[0]}'; iterate: 'for i in \"${arr[@]}\"; do echo \"$i\"; done'." },
      { pattern: /shebang|^#!|bash.*script/i, answer: "Add shebang '#!/usr/bin/env bash'. Make exec: 'chmod +x script.sh'. Run: './script.sh'." },
      { pattern: /exit.*code|status/i, answer: "Exit codes: 0=success, non-zero=error. Last code: '$?'. Safer scripts: 'set -euo pipefail'." },
      { pattern: /permissions.*numbers|rwx/i, answer: "Permissions math: r=4, w=2, x=1 => 754 means rwx r-x r--. Directories need 'x' to enter." },
    ];

    function answerFor(question) {
      for (const item of knowledge) {
        if (item.pattern.test(question)) return item.answer;
      }
      return "I couldn't find an exact answer. Try asking about 'ls', 'chmod', 'grep', 'pipes', 'loops', or 'shebang'. You can also review the Bash lessons on this site.";
    }

    // Greeting
    botReply("Hi! I'm your Bash Helper. Ask me about commands, scripting, permissions, grep/find, redirects, and more.");
    renderSuggestions();

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const q = (input.value || '').trim();
      if (!q) return;
      addMessage(q, 'user');
      input.value = '';
      const reply = answerFor(q);
      const typing = showTyping();
      // small delay for UX
      setTimeout(() => { hideTyping(typing); botReply(reply); }, 300);
    });
  }

  window.addEventListener('load', initBashChatbot);

})();