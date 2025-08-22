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

  /**
   * HTML Course Chatbot Widget (appears on pages whose path includes "html")
   */
  function initHtmlChatbot() {
    const isHtmlPage = /(\/)html-course\.html$/i.test(window.location.pathname) || /html-course\/html-lesson-\d+\.html$/i.test(window.location.pathname);
    if (!isHtmlPage) return;
    if (document.getElementById('htmlChatToggle')) return;

    const style = document.createElement('style');
    style.id = 'html-chatbot-styles';
    style.textContent = `
      .html-chat-toggle { position: fixed; right: 18px; bottom: calc(86px + env(safe-area-inset-bottom, 0)); width: 52px; height: 52px; border-radius: 50%; border: none; background: linear-gradient(135deg, #f97316, #fb7185); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1054; box-shadow: 0 8px 24px rgba(249,115,22,.35); }
      .html-chatbot { position: fixed; right: 18px; bottom: calc(150px + env(safe-area-inset-bottom, 0)); width: 380px; max-width: calc(100% - 24px); height: min(60vh, 520px); min-height: 320px; background: #fff; border-radius: 14px; box-shadow: 0 18px 48px rgba(0,0,0,.18); z-index: 1054; display: none; flex-direction: column; overflow: hidden; border: 1px solid rgba(0,0,0,.06); }
      .html-chatbot.open { display: flex; }
      .html-chatbot .hc-header { display:flex; align-items:center; justify-content:space-between; background: linear-gradient(135deg, #f97316, #fb7185); color:#fff; padding:10px 12px; }
      .html-chatbot .hc-body { flex: 1 1 auto; overflow-y:auto; padding:12px; background: linear-gradient(180deg, #fff, #fff7ed); }
      .html-chatbot .hc-msg { max-width:85%; margin: 6px 0; padding: 8px 10px; border-radius: 12px; font-size: .95rem; }
      .html-chatbot .hc-msg.bot { background:#fff; border:1px solid rgba(0,0,0,.06); }
      .html-chatbot .hc-msg.user { background: #fb923c; color:#fff; margin-left:auto; }
      .html-chatbot .hc-input { display:flex; gap:8px; padding:8px; border-top:1px solid rgba(0,0,0,.06); background:#fff; }
      .html-chatbot .hc-input input { flex:1 1 auto; border:1px solid rgba(0,0,0,.15); border-radius:10px; padding:10px; }
      .html-chatbot .hc-input button { width:46px; border:none; border-radius:10px; background: linear-gradient(135deg, #f97316, #fb7185); color:#fff; }
      @media (max-width: 576px) { .html-chatbot { right:12px; bottom: calc(140px + env(safe-area-inset-bottom, 0)); width: calc(100% - 24px); } .html-chat-toggle{ right:12px; } }
    `;
    document.head.appendChild(style);

    const html = `
      <div class="html-chatbot" id="htmlChatbot" aria-hidden="true" aria-label="HTML chatbot">
        <div class="hc-header">
          <div class="d-flex align-items-center gap-2"><i class="bi bi-filetype-html"></i><strong>HTML Helper</strong></div>
          <button class="btn btn-sm btn-light" id="htmlChatClose" aria-label="Close chatbot"><i class="bi bi-x"></i></button>
        </div>
        <div class="hc-body" id="hcBody" role="log"></div>
        <div class="px-2 pb-1" id="hcSuggestions"></div>
        <form class="hc-input" id="hcForm" autocomplete="off"><input id="hcInput" type="text" placeholder="Ask about tags, structure, semantics..." aria-label="Ask an HTML question"/><button type="submit" aria-label="Send"><i class="bi bi-send"></i></button></form>
      </div>
      <button class="html-chat-toggle" id="htmlChatToggle" title="Open HTML Helper" aria-expanded="false"><i class="bi bi-chat-dots"></i></button>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    const container = document.getElementById('htmlChatbot');
    const toggle = document.getElementById('htmlChatToggle');
    const closeBtn = document.getElementById('htmlChatClose');
    const body = document.getElementById('hcBody');
    const form = document.getElementById('hcForm');
    const input = document.getElementById('hcInput');

    function open() { container.classList.add('open'); container.setAttribute('aria-hidden','false'); toggle.setAttribute('aria-expanded','true'); input.focus(); }
    function close() { container.classList.remove('open'); container.setAttribute('aria-hidden','true'); toggle.setAttribute('aria-expanded','false'); }
    toggle.addEventListener('click', open);
    closeBtn.addEventListener('click', close);

    function addMsg(text, who) {
      const div = document.createElement('div');
      div.className = 'hc-msg ' + (who === 'user' ? 'user' : 'bot');
      div.innerHTML = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function showTyping() {
      const wrap = document.createElement('div');
      wrap.className = 'hc-msg bot';
      wrap.setAttribute('data-typing','true');
      wrap.innerHTML = '<span class="text-muted">typing…</span>';
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
      return wrap;
    }
    function hideTyping(node) { if (node && node.parentNode) node.parentNode.removeChild(node); }

    function renderSuggestions() {
      const holder = document.getElementById('hcSuggestions');
      if (!holder) return;
      const topics = ['What is <!DOCTYPE html>?','Semantic tags','Create a link','Image alt text','Lists and tables','Forms and labels'];
      holder.innerHTML = topics.map(t=>`<button type="button" class="btn btn-sm btn-outline-secondary me-1 mb-1 hc-chip">${t.replace(/</g,'&lt;')}</button>`).join('');
      holder.querySelectorAll('.hc-chip').forEach(btn => {
        btn.addEventListener('click', () => { input.value = btn.textContent; input.focus(); });
      });
    }

    const knowledge = [
      { p: /doctype|html5/i, a: "The <!DOCTYPE html> declaration is a special instruction that tells the web browser what version of HTML your page is written in.Use &lt;!DOCTYPE html&gt; at the top to enable HTML5 standards mode." },
      { p: /structure|skeleton|boilerplate/i, a: "Basic skeleton: &lt;html&gt;&lt;head&gt;&lt;meta charset='utf-8'&gt;&lt;title&gt;...&lt;/title&gt;&lt;/head&gt;&lt;body&gt;...&lt;/body&gt;&lt;/html&gt;" },
      { p: /head(er)?|meta|title/i, a: "&lt;head&gt; holds metadata: &lt;title&gt;, &lt;meta name='viewport'&gt;, CSS &lt;link&gt;, and optional &lt;script&gt; (defer)." },
      { p: /semantic|header|main|footer|section|article/i, a: "A semantic tag in HTML is an element that clearly describes its meaning both to the browser and to developers.Use semantic tags (&lt;header&gt;, &lt;main&gt;, &lt;section&gt;, &lt;article&gt;, &lt;footer&gt;) for meaning and accessibility." },
      { p: /a\s+tag|link|href|anchor/i, a: "Links: &lt;a href='path'&gt;Label&lt;/a&gt;. For new tab, add target='_blank' and rel='noopener'." },
      { p: /img|image|alt/i, a: "Images: &lt;img src='...' alt='useful description'&gt;. The alt describes the image content or purpose." },
      { p: /list|ul|ol|li/i, a: "Lists: &lt;ul&gt;/&lt;ol&gt; contain &lt;li&gt; items. Nest lists inside an &lt;li&gt; when creating sublists." },
      { p: /table|thead|tbody|tr|th|td/i, a: "Tables: header cells use &lt;th&gt;, data cells &lt;td&gt;. Group with &lt;thead&gt; and &lt;tbody&gt;." },
      { p: /forms?|input|label|placeholder|select|textarea/i, a: "Forms: associate labels and inputs via for/id. Use proper types (email, number). Provide helpful placeholders and aria-describedby for hints." },
      { p: /accessib|aria|screen reader|alt|label/i, a: "Prefer native semantics; label inputs; provide alt text; manage focus for dialogs; use ARIA sparingly to supplement." },
    ];
    function answer(q) {
      for (const k of knowledge) if (k.p.test(q)) return k.a;
      return "Ask me about structure, semantics, links, images, lists, tables, or forms.";
    }

    addMsg("Hi! I'm your HTML Helper. Ask me about tags, semantics, links, images, lists, tables, and forms.", 'bot');
    renderSuggestions();
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const q = (input.value||'').trim(); if (!q) return;
      addMsg(q,'user'); input.value='';
      const a = answer(q);
      const typing = showTyping();
      setTimeout(() => { hideTyping(typing); addMsg(a,'bot'); }, 250);
    });
  }

  window.addEventListener('load', initHtmlChatbot);

  /**
   * Bash Course: Progress, Dashboard, Quizzes, Roadmap, Gamification
   */
  function initBashCourseFeatures() {
    const isBash = /bash/i.test(window.location.pathname);
    if (!isBash) return;

    const STORAGE_KEY = 'bashCourseProgress_v1';
    const LESSONS = [
      { id: 1, title: 'Introduction to Bash', path: 'bash-course/bash-lesson-1.html' },
      { id: 2, title: 'Files & Directories', path: 'bash-course/bash-lesson-2.html' },
      { id: 3, title: 'Viewing & Editing Files', path: 'bash-course/bash-lesson-3.html' },
      { id: 4, title: 'Permissions', path: 'bash-course/bash-lesson-4.html' },
      { id: 5, title: 'Scripting Basics', path: 'bash-course/bash-lesson-5.html' }
    ];

    function loadStore() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) { return {}; }
    }
    function saveStore(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    function getStore() {
      const s = loadStore();
      return {
        lessonsCompleted: s.lessonsCompleted || {},
        quizzes: s.quizzes || {},
        points: Number.isFinite(s.points) ? s.points : 0,
        badges: Array.isArray(s.badges) ? s.badges : [],
        lastLesson: s.lastLesson || 1
      };
    }
    function updateStore(mutator) { const s = getStore(); mutator(s); saveStore(s); return s; }
    function addPoints(n) { updateStore(s => { s.points = Math.max(0, (s.points || 0) + n); }); }
    function addBadge(name) { updateStore(s => { if (!s.badges.includes(name)) s.badges.push(name); }); }
    function markLessonComplete(id) { updateStore(s => { s.lessonsCompleted[id] = true; s.lastLesson = id; }); }
    function setQuizScore(id, score, total) { updateStore(s => { s.quizzes[id] = { score: score, total: total }; }); }
    function isLessonComplete(id) { const s = getStore(); return !!s.lessonsCompleted[id]; }
    function getProgressPct() { const s = getStore(); const completed = LESSONS.filter(l => s.lessonsCompleted[l.id]).length; return Math.round((completed / LESSONS.length) * 100); }

    function currentLessonIdFromPath() {
      const m = window.location.pathname.match(/bash-lesson-(\d+)\.html/i);
      return m ? parseInt(m[1], 10) : null;
    }

    // Quiz bank (2 quick MCQs each)
    const QUIZZES = {
      1: [
        { q: 'Which command prints the current directory?', opts: ['whoami','pwd','dir'], a: 1 },
        { q: 'Which program is a shell?', opts: ['bash','cat','chmod'], a: 0 }
      ],
      2: [
        { q: 'Create a directory named projects', opts: ['mkdir projects','touch projects','mv projects'], a: 0 },
        { q: 'List files with details', opts: ['ls -l','pwd -l','echo -l'], a: 0 }
      ],
      3: [
        { q: 'Print a file content', opts: ['cat file.txt','chmod file.txt','mv file.txt'], a: 0 },
        { q: 'Append text to notes.txt', opts: ['echo "Hi" > notes.txt','echo "Hi" >> notes.txt','cat >> "Hi" notes.txt'], a: 1 }
      ],
      4: [
        { q: 'Make script.sh executable', opts: ['chmod +x script.sh','cat script.sh','bash script.sh +x'], a: 0 },
        { q: 'What does 755 generally mean?', opts: ['rwx r-x r-x','rw- rw- rw-','r-- r-- r--'], a: 0 }
      ],
      5: [
        { q: 'Add a shebang for Bash', opts: ['#!/usr/bin/env bash','#!/bin/env python','#!/usr/bin/node'], a: 0 },
        { q: 'Print first argument $1 in script', opts: ['echo $1','print $1','read $1'], a: 0 }
      ]
    };

    function renderDashboard() {
      if (!/bash-course\.html$/i.test(window.location.pathname)) return;
      if (document.getElementById('bashDashboard')) return;

      const container = document.querySelector('main .section .container');
      if (!container) return;

      const s = getStore();
      const pct = getProgressPct();
      const nextLesson = LESSONS.find(l => !s.lessonsCompleted[l.id]) || LESSONS[LESSONS.length-1];
      const resumeLesson = LESSONS.find(l => l.id === s.lastLesson) || LESSONS[0];

      const dash = document.createElement('div');
      dash.id = 'bashDashboard';
      dash.className = 'row g-4 mb-4';
      dash.innerHTML = `
        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="mb-0">Ayush</h5>
                <span class="badge bg-primary">Bash</span>
              </div>
              <div class="d-flex align-items-center gap-3">
                <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center" style="width:56px;height:56px;color:#fff;font-weight:600;">${(s.points||0)}</div>
                <div>
                  <div class="small text-muted">Points</div>
                  <div class="fw-semibold">Earn by completing lessons & quizzes</div>
                </div>
              </div>
              <hr/>
              <div class="small text-muted mb-2">Badges</div>
              <div id="badgeHolder" class="d-flex flex-wrap gap-2">${(s.badges||[]).map(b => `<span class='badge bg-success'>${b}</span>`).join('') || '<span class="text-muted">No badges yet</span>'}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="mb-0">Course Progress</h5>
                <span class="small text-muted">${pct}% complete</span>
              </div>
              <div class="progress mb-3" style="height:10px;">
                <div class="progress-bar" role="progressbar" style="width:${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex gap-2">
                <a href="${resumeLesson.path}" class="btn btn-primary"><i class="bi bi-play-fill"></i> Resume Lesson ${resumeLesson.id}</a>
                <a href="${nextLesson.path}" class="btn btn-outline-primary">Next Lesson</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h6 class="mb-3">Roadmap</h6>
              <div class="row g-3">
                ${LESSONS.map(l => {
                  const done = isLessonComplete(l.id);
                  return `<div class='col-md-4 col-lg-2'>
                    <a href='${l.path}' class='text-decoration-none'>
                      <div class='p-3 border rounded h-100 ${done ? 'border-success' : ''}'>
                        <div class='d-flex align-items-center gap-2 mb-1'>
                          <i class='bi ${done ? 'bi-check-circle-fill text-success' : 'bi-circle'}'></i>
                          <strong>Lesson ${l.id}</strong>
                        </div>
                        <div class='small text-muted'>${l.title}</div>
                      </div>
                    </a>
                  </div>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      container.prepend(dash);
    }

    function injectLessonUI(lessonId) {
      const col = document.querySelector('main .section .container .row .col-lg-9');
      if (!col) return;
      if (document.getElementById('lessonProgressControls')) return;

      const completed = isLessonComplete(lessonId);
      const wrap = document.createElement('div');
      wrap.id = 'lessonProgressControls';
      wrap.className = 'card mb-4';
      wrap.innerHTML = `
        <div class="card-body d-flex flex-wrap gap-2 align-items-center justify-content-between">
          <div>
            <div class="small text-muted">Lesson ${lessonId}</div>
            <div class="fw-semibold">Mark your progress and take the quiz</div>
          </div>
          <div class="d-flex gap-2">
            <button id="btnMarkComplete" class="btn ${completed ? 'btn-success' : 'btn-outline-success'}">${completed ? 'Completed' : 'Mark as Completed'}</button>
            <a href="../bash-practice.html?lesson=${lessonId}" class="btn btn-outline-primary"><i class="bi bi-terminal"></i> Practice</a>
          </div>
        </div>`;
      col.prepend(wrap);

      const btn = wrap.querySelector('#btnMarkComplete');
      btn.addEventListener('click', function() {
        if (isLessonComplete(lessonId)) return;
        markLessonComplete(lessonId);
        addPoints(10);
        if (lessonId === 1) addBadge('First Steps');
        if (LESSONS.every(l => isLessonComplete(l.id))) addBadge('Bash Novice');
        btn.classList.remove('btn-outline-success');
        btn.classList.add('btn-success');
        btn.textContent = 'Completed';
      });
    }

    function injectQuiz(lessonId) {
      const questions = QUIZZES[lessonId];
      if (!questions) return;
      if (document.getElementById('lessonQuiz')) return;

      const col = document.querySelector('main .section .container .row .col-lg-9');
      if (!col) return;
      const card = document.createElement('div');
      card.id = 'lessonQuiz';
      card.className = 'card mt-4';
      const existingScore = getStore().quizzes[lessonId];
      card.innerHTML = `
        <div class="card-header"><strong>Quick Quiz</strong></div>
        <div class="card-body">
          ${questions.map((q, idx) => `
            <div class="mb-3">
              <div class="fw-semibold mb-1">Q${idx+1}. ${q.q}</div>
              ${q.opts.map((opt, i) => `
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="q${idx}" id="q${idx}_${i}" value="${i}">
                  <label class="form-check-label" for="q${idx}_${i}">${opt}</label>
                </div>`).join('')}
            </div>`).join('')}
          <div class="d-flex gap-2 align-items-center">
            <button id="btnSubmitQuiz" class="btn btn-primary">Submit Quiz</button>
            <div id="quizFeedback" class="small"></div>
          </div>
        </div>`;
      col.appendChild(card);

      const feedback = card.querySelector('#quizFeedback');
      if (existingScore) {
        feedback.innerHTML = `<span class='text-success'>Previous score: ${existingScore.score}/${existingScore.total}</span>`;
      }

      card.querySelector('#btnSubmitQuiz').addEventListener('click', function() {
        let score = 0;
        questions.forEach((q, idx) => {
          const sel = card.querySelector(`input[name="q${idx}"]:checked`);
          if (sel && parseInt(sel.value, 10) === q.a) score += 1;
        });
        const total = questions.length;
        setQuizScore(lessonId, score, total);
        if (score === total) { addPoints(5); addBadge('Quiz Whiz'); feedback.innerHTML = `<span class='text-success'>Perfect! ${score}/${total}</span>`; }
        else { feedback.innerHTML = `<span class='text-primary'>Score: ${score}/${total}</span>`; }
      });
    }

    // Page routing
    renderDashboard();
    const lessonId = currentLessonIdFromPath();
    if (lessonId) {
      updateStore(s => { s.lastLesson = lessonId; });
      injectLessonUI(lessonId);
      injectQuiz(lessonId);
    }
  }

  window.addEventListener('load', initBashCourseFeatures);

  /**
   * HTML Course: Dashboard, Progress, Quizzes (mirrors Bash)
   */
  function initHtmlCourseFeatures() {
    const isHtml = /html-course|html-lesson-/i.test(window.location.pathname);
    if (!isHtml) return;

    const STORAGE_KEY = 'htmlCourseProgress_v1';
    const LESSONS = [
      { id: 1, title: 'Introduction', path: 'html-course/html-lesson-1.html' },
      { id: 2, title: 'Basic Tags', path: 'html-course/html-lesson-2.html' },
      { id: 3, title: 'Links & Images', path: 'html-course/html-lesson-3.html' },
      { id: 4, title: 'Lists & Tables', path: 'html-course/html-lesson-4.html' },
      { id: 5, title: 'Forms', path: 'html-course/html-lesson-5.html' }
    ];

    function loadStore() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) { return {}; } }
    function saveStore(d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
    function getStore() {
      const s = loadStore();
      return { lessonsCompleted: s.lessonsCompleted || {}, quizzes: s.quizzes || {}, points: Number.isFinite(s.points)?s.points:0, badges: Array.isArray(s.badges)?s.badges:[], lastLesson: s.lastLesson || 1 };
    }
    function updateStore(fn){ const s = getStore(); fn(s); saveStore(s); return s; }
    function addPoints(n){ updateStore(s => { s.points = Math.max(0,(s.points||0)+n); }); }
    function addBadge(name){ updateStore(s => { if (!s.badges.includes(name)) s.badges.push(name); }); }
    function markLessonComplete(id){ updateStore(s => { s.lessonsCompleted[id] = true; s.lastLesson = id; }); }
    function isLessonComplete(id){ const s = getStore(); return !!s.lessonsCompleted[id]; }
    function setQuizScore(id,score,total){ updateStore(s => { s.quizzes[id] = { score, total }; }); }
    function progressPct(){ const s = getStore(); const c = LESSONS.filter(l => s.lessonsCompleted[l.id]).length; return Math.round((c/LESSONS.length)*100); }

    function currentLessonId(){ const m = window.location.pathname.match(/html-lesson-(\d+)\.html/i); return m?parseInt(m[1],10):null; }

    const QUIZZES = {
      1: [
        { q: 'Correct HTML5 doctype?', opts: ['<!DOCTYPE html>','<!doctype HTML5>','<!HTML>'], a: 0 },
        { q: 'Where does page title go?', opts: ['<body>','<head>','<footer>'], a: 1 }
      ],
      2: [
        { q: 'Largest heading tag?', opts: ['<h1>','<h6>','<h0>'], a: 0 },
        { q: 'Paragraph element is?', opts: ['<para>','<text>','<p>'], a: 2 }
      ],
      3: [
        { q: 'Create a link?', opts: ['<a href="/">Home</a>','<link href="/">','<url>Home</url>'], a: 0 },
        { q: 'Add alt text to image?', opts: ['<img src="a.jpg">','<img alt="A" src="a.jpg">','<image src="a.jpg" alt="A">'], a: 1 }
      ],
      4: [
        { q: 'Unordered list element?', opts: ['<ol>','<ul>','<li>'], a: 1 },
        { q: 'Header cell tag in tables?', opts: ['<th>','<td>','<tr>'], a: 0 }
      ],
      5: [
        { q: 'Label an input correctly?', opts: ['<label><input> Name</label>','<label for="n">Name</label><input id="n">','<label id="n">Name</label><input for="n">'], a: 1 },
        { q: 'Email field type?', opts: ['text','email','mail'], a: 1 }
      ]
    };

    function renderDashboard(){
      if (!/html-course\.html$/i.test(window.location.pathname)) return;
      if (document.getElementById('htmlDashboard')) return;
      const container = document.querySelector('main .section .container');
      if (!container) return;
      const s = getStore();
      const pct = progressPct();
      const next = LESSONS.find(l => !s.lessonsCompleted[l.id]) || LESSONS[LESSONS.length-1];
      const resume = LESSONS.find(l => l.id === s.lastLesson) || LESSONS[0];
      const dash = document.createElement('div');
      dash.id = 'htmlDashboard';
      dash.className = 'row g-4 mb-4';
      dash.innerHTML = `
        <div class="col-lg-4">
          <div class="card h-100"><div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2"><h5 class="mb-0">Ayush</h5><span class="badge bg-warning text-dark">HTML</span></div>
            <div class="d-flex align-items-center gap-3">
              <div class="rounded-circle bg-warning d-flex align-items-center justify-content-center" style="width:56px;height:56px;color:#111;font-weight:600;">${(s.points||0)}</div>
              <div><div class="small text-muted">Points</div><div class="fw-semibold">Complete lessons & quizzes</div></div>
            </div>
            <hr/>
            <div class="small text-muted mb-2">Badges</div>
            <div id="htmlBadgeHolder" class="d-flex flex-wrap gap-2">${(s.badges||[]).map(b=>`<span class='badge bg-success'>${b}</span>`).join('') || '<span class="text-muted">No badges yet</span>'}</div>
          </div></div>
        </div>
        <div class="col-lg-8">
          <div class="card h-100"><div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2"><h5 class="mb-0">Course Progress</h5><span class="small text-muted">${pct}% complete</span></div>
            <div class="progress mb-3" style="height:10px;"><div class="progress-bar bg-warning" role="progressbar" style="width:${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div></div>
            <div class="d-flex gap-2"><a href="${resume.path}" class="btn btn-warning text-dark"><i class="bi bi-play-fill"></i> Resume Lesson ${resume.id}</a><a href="${next.path}" class="btn btn-outline-warning">Next Lesson</a></div>
          </div></div>
        </div>
        <div class="col-12">
          <div class="card"><div class="card-body">
            <h6 class="mb-3">Roadmap</h6>
            <div class="row g-3">
              ${LESSONS.map(l=>{
                const done = isLessonComplete(l.id);
                return `<div class='col-md-4 col-lg-2'>
                  <a href='${l.path}' class='text-decoration-none'>
                    <div class='p-3 border rounded h-100 ${done ? 'border-success' : ''}'>
                      <div class='d-flex align-items-center gap-2 mb-1'>
                        <i class='bi ${done ? 'bi-check-circle-fill text-success' : 'bi-circle'}'></i>
                        <strong>Lesson ${l.id}</strong>
                      </div>
                      <div class='small text-muted'>${l.title}</div>
                    </div>
                  </a>
                </div>`;
              }).join('')}
            </div>
          </div></div>
        </div>`;
      container.prepend(dash);
    }

    function injectLessonUI(lessonId){
      const col = document.querySelector('main .section .container .row .col-lg-9');
      if (!col) return;
      if (document.getElementById('htmlLessonControls')) return;
      const completed = isLessonComplete(lessonId);
      const wrap = document.createElement('div');
      wrap.id = 'htmlLessonControls';
      wrap.className = 'card mb-4';
      wrap.innerHTML = `
        <div class="card-body d-flex flex-wrap gap-2 align-items-center justify-content-between">
          <div><div class="small text-muted">Lesson ${lessonId}</div><div class="fw-semibold">Mark your progress and take the quiz</div></div>
          <div class="d-flex gap-2">
            <button id="btnHtmlMarkComplete" class="btn ${completed ? 'btn-success' : 'btn-outline-success'}">${completed ? 'Completed' : 'Mark as Completed'}</button>
            <a href="../html-practice.html?lesson=${lessonId}" class="btn btn-outline-warning text-dark"><i class="bi bi-code-slash"></i> Practice</a>
          </div>
        </div>`;
      col.prepend(wrap);
      const btn = wrap.querySelector('#btnHtmlMarkComplete');
      btn.addEventListener('click', function(){
        if (isLessonComplete(lessonId)) return;
        markLessonComplete(lessonId);
        addPoints(10);
        if (lessonId === 1) addBadge('HTML Starter');
        if (LESSONS.every(l=>isLessonComplete(l.id))) addBadge('HTML Novice');
        btn.classList.remove('btn-outline-success'); btn.classList.add('btn-success'); btn.textContent = 'Completed';
      });
    }

    function injectQuiz(lessonId){
      const questions = QUIZZES[lessonId];
      if (!questions) return;
      if (document.getElementById('htmlLessonQuiz')) return;
      const col = document.querySelector('main .section .container .row .col-lg-9');
      if (!col) return;
      const card = document.createElement('div');
      card.id = 'htmlLessonQuiz';
      card.className = 'card mt-4';
      const existing = getStore().quizzes[lessonId];
      card.innerHTML = `
        <div class="card-header"><strong>Quick Quiz</strong></div>
        <div class="card-body">
          ${questions.map((q, idx)=>`
            <div class="mb-3">
              <div class="fw-semibold mb-1">Q${idx+1}. ${q.q.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
              ${q.opts.map((opt,i)=>`
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="hq${idx}" id="hq${idx}_${i}" value="${i}">
                  <label class="form-check-label" for="hq${idx}_${i}">${opt.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</label>
                </div>`).join('')}
            </div>`).join('')}
          <div class="d-flex gap-2 align-items-center">
            <button id="btnHtmlSubmitQuiz" class="btn btn-warning text-dark">Submit Quiz</button>
            <div id="htmlQuizFeedback" class="small"></div>
          </div>
        </div>`;
      col.appendChild(card);

      const feedback = card.querySelector('#htmlQuizFeedback');
      if (existing) feedback.innerHTML = `<span class='text-success'>Previous score: ${existing.score}/${existing.total}</span>`;

      card.querySelector('#btnHtmlSubmitQuiz').addEventListener('click', function(){
        let score = 0; const total = questions.length;
        questions.forEach((q, idx)=>{
          const sel = card.querySelector(`input[name="hq${idx}"]:checked`);
          if (sel && parseInt(sel.value,10) === q.a) score += 1;
        });
        setQuizScore(lessonId, score, total);
        if (score === total) { addPoints(5); addBadge('HTML Quiz Whiz'); feedback.innerHTML = `<span class='text-success'>Perfect! ${score}/${total}</span>`; }
        else { feedback.innerHTML = `<span class='text-primary'>Score: ${score}/${total}</span>`; }
      });
    }

    // Route
    renderDashboard();
    const lid = currentLessonId();
    if (lid) {
      updateStore(s => { s.lastLesson = lid; });
      injectLessonUI(lid);
      injectQuiz(lid);
    }
  }

  window.addEventListener('load', initHtmlCourseFeatures);

  /**
   * HTML Practice: "Build a Webpage" Challenge (only on html-practice.html)
   * - Level-based sandbox with tag unlocks and tag palette
   * - Editor + live preview, DOM-based validation
   * - Points + badges integrated with HTML course storage
   */
  function initHtmlPracticeGame() {
    const isPractice = /\/html-practice\.html$/i.test(window.location.pathname);
    if (!isPractice) return;
    if (document.getElementById('hpGame')) return;

    // Practice storage
    const PRACTICE_KEY = 'htmlPractice_v1';
    function loadP() { try { return JSON.parse(localStorage.getItem(PRACTICE_KEY) || '{}'); } catch(e) { return {}; } }
    function saveP(s) { localStorage.setItem(PRACTICE_KEY, JSON.stringify(s)); }
    function getP() {
      const s = loadP();
      return {
        level: Number.isFinite(s.level)?s.level:1,
        bestTimes: s.bestTimes || {},
        unlockedTags: Array.isArray(s.unlockedTags)?s.unlockedTags:[],
        hintShown: s.hintShown || {}
      };
    }
    function setLevel(n, total) { const s = getP(); s.level = Math.max(1, Math.min(n, total)); saveP(s); return s.level; }

    // HTML course points/badges
    const COURSE_KEY = 'htmlCourseProgress_v1';
    function loadC() { try { return JSON.parse(localStorage.getItem(COURSE_KEY) || '{}'); } catch(e){ return {}; } }
    function saveC(s) { localStorage.setItem(COURSE_KEY, JSON.stringify(s)); }
    function addCoursePoints(n) { const s = loadC(); s.points = Math.max(0, Number.isFinite(s.points)?(s.points+n):n); saveC(s); }
    function addCourseBadge(name) { const s = loadC(); s.badges = Array.isArray(s.badges)?s.badges:[]; if (!s.badges.includes(name)) s.badges.push(name); saveC(s); }

    // Levels
    const LEVELS = [
      { id:1, title:'Hello, HTML', goal:'Create an <h1> with text “Hello HTML”', starter:'<!-- Build your page here -->', hint:'Use <h1>Hello HTML</h1>', unlock:['h1'], validate: d=>{ const h=d.querySelector('h1'); return !!h && /hello\s*html/i.test(h.textContent||''); } },
      { id:2, title:'Paragraph Basics', goal:'Add a <p> that contains the word “welcome”', starter:'<h1>Hello HTML</h1>', hint:'Use <p>Welcome to HTML</p>', unlock:['p'], validate: d=>{ const p=d.querySelector('p'); return !!p && /welcome/i.test(p.textContent||''); } },
      { id:3, title:'Link It', goal:'Create a link to ../courses.html labeled “Courses”', starter:'<h1>Hello</h1>\n<p>Welcome</p>', hint:'<a href="../courses.html">Courses</a>', unlock:['a'], validate: d=>{ const a=d.querySelector('a[href="../courses.html"]'); return !!a && /courses/i.test(a.textContent||''); } },
      { id:4, title:'Image Alt', goal:'Add an image with non-empty alt text', starter:'<h1>Gallery</h1>', hint:'<img src="assets/img/favicon.png" alt="Example">', unlock:['img'], validate: d=>{ const i=d.querySelector('img'); return !!i && !!(i.getAttribute('alt')||'').trim(); } },
      { id:5, title:'List Items', goal:'Create a <ul> with at least 3 <li> items', starter:'<h1>Groceries</h1>', hint:'<ul>\n  <li>One</li>\n  <li>Two</li>\n  <li>Three</li>\n</ul>', unlock:['ul','li'], validate: d=>{ const ul=d.querySelector('ul'); return !!ul && ul.querySelectorAll('li').length>=3; } },
      { id:6, title:'Form + Label', goal:'Label an email input using for/id', starter:'<h1>Contact</h1>', hint:'<label for="e">Email</label> <input id="e" type="email">', unlock:['label','input'], validate: d=>{ const i=d.querySelector('input[type="email"]'); if(!i) return false; const id=i.getAttribute('id'); if(!id) return false; const lab=d.querySelector(`label[for="${id}"]`); return !!lab; } }
    ];

    // Build UI
    let container = document.querySelector('main .section .container');
    if (!container) {
      const mainRoot = document.querySelector('main.main') || document.querySelector('main') || document.body;
      const section = document.createElement('section');
      section.className = 'section';
      const inner = document.createElement('div');
      inner.className = 'container';
      section.appendChild(inner);
      mainRoot.appendChild(section);
      container = inner;
    }
    const card = document.createElement('div');
    card.className = 'card mb-4';
    card.id = 'hpGame';
    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-info text-dark" id="hpLevelBadge">Build a Webpage — Level 1/${LEVELS.length}</span>
            <span class="small text-muted" id="hpGoal">Goal</span>
          </div>
          <div class="d-flex align-items-center gap-3 small text-muted">
            <span><i class="bi bi-trophy"></i> <span id="hpProgress">0</span>/${LEVELS.length}</span>
            <span><i class="bi bi-coin"></i> <span id="hpPoints">0</span> pts</span>
            <button class="btn btn-sm btn-outline-secondary" id="hpReset">Reset</button>
          </div>
        </div>
        <div class="mb-2">
          <div class="small text-muted mb-1">Unlocked tags</div>
          <div id="hpPalette" class="d-flex flex-wrap gap-2"></div>
        </div>
        <div class="row g-3">
          <div class="col-lg-6">
            <label class="form-label small">Editor</label>
            <textarea id="hpEditor" class="form-control" rows="12" style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;"></textarea>
            <div class="small text-muted mt-1" id="hpHint"></div>
          </div>
          <div class="col-lg-6">
            <label class="form-label small">Preview</label>
            <iframe id="hpPreview" style="width:100%;height:300px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;"></iframe>
            <div id="hpFeedback" class="mt-2"></div>
          </div>
        </div>
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-primary" id="hpRun"><i class="bi bi-play-fill"></i> Run</button>
          <button class="btn btn-success" id="hpNext" disabled><i class="bi bi-arrow-right-circle"></i> Next</button>
        </div>
      </div>
    `;
    container.prepend(card);

    // Wiring
    const badge = document.getElementById('hpLevelBadge');
    const goal = document.getElementById('hpGoal');
    const hint = document.getElementById('hpHint');
    const progress = document.getElementById('hpProgress');
    const pointsEl = document.getElementById('hpPoints');
    const palette = document.getElementById('hpPalette');
    const editor = document.getElementById('hpEditor');
    const preview = document.getElementById('hpPreview');
    const feedback = document.getElementById('hpFeedback');
    const btnRun = document.getElementById('hpRun');
    const btnNext = document.getElementById('hpNext');
    const btnReset = document.getElementById('hpReset');

    let levelIdx = Math.max(0, Math.min(LEVELS.length-1, getP().level - 1));
    let levelStart = Date.now();

    function coursePoints() { const s = loadC(); return Number.isFinite(s.points)?s.points:0; }

    function snippetFor(tag) {
      switch(tag) {
        case 'h1': return '<h1>Title</h1>';
        case 'p': return '<p>Paragraph text</p>';
        case 'a': return '<a href="../courses.html">Courses</a>';
        case 'img': return '<img src="assets/img/favicon.png" alt="Example">';
        case 'ul': return '<ul>\n  <li>One</li>\n  <li>Two</li>\n  <li>Three</li>\n</ul>';
        case 'li': return '<li>Item</li>';
        case 'label': return '<label for="e">Email</label>';
        case 'input': return '<input id="e" type="email">';
        default: return `<${tag}></${tag}>`;
      }
    }

    function insertAtCursor(textarea, text) {
      const start = textarea.selectionStart || 0; const end = textarea.selectionEnd || 0;
      const before = textarea.value.substring(0, start);
      const after = textarea.value.substring(end);
      textarea.value = before + text + after;
      const pos = start + text.length;
      textarea.selectionStart = textarea.selectionEnd = pos;
      textarea.focus();
    }

    function renderPalette(unlocked) {
      palette.innerHTML = '';
      if (!unlocked.length) {
        const span = document.createElement('span');
        span.className = 'text-muted';
        span.textContent = 'No tags yet — complete a level to unlock.';
        palette.appendChild(span);
        return;
      }
      unlocked.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-sm btn-outline-primary';
        btn.setAttribute('data-tag', t);
        // Show as literal tag text, not rendered HTML
        btn.textContent = `<${t}>`;
        btn.addEventListener('click', () => insertAtCursor(editor, '\n' + snippetFor(t) + '\n'));
        palette.appendChild(btn);
      });
    }

    function render() {
      const L = LEVELS[levelIdx];
      badge.textContent = `Build a Webpage — Level ${L.id}/${LEVELS.length}`;
      goal.textContent = L.goal;
      // Hint: gated behind a button; costs 1 point once per level
      const pState = getP();
      const levelId = L.id;
      if (pState.hintShown[levelId]) {
        hint.innerHTML = `<span class="text-muted">Hint:</span> <code>${L.hint.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code>`;
      } else {
        hint.innerHTML = `<button id="hpShowHint" class="btn btn-sm btn-outline-secondary">Show hint (-1 pt)</button>`;
        const btn = document.getElementById('hpShowHint');
        btn.addEventListener('click', function(){
          // Deduct once and persist
          const st = getP();
          if (!st.hintShown[levelId]) {
            addCoursePoints(-1);
            st.hintShown[levelId] = true;
            saveP({ level: st.level, bestTimes: st.bestTimes || {}, unlockedTags: st.unlockedTags || [], hintShown: st.hintShown });
            pointsEl.textContent = String(coursePoints());
          }
          hint.innerHTML = `<span class=\"text-muted\">Hint:</span> <code>${L.hint.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code>`;
        });
      }
      editor.value = L.starter;
      preview.srcdoc = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
      feedback.innerHTML = '';
      btnNext.disabled = true;
      progress.textContent = String(levelIdx);
      pointsEl.textContent = String(coursePoints());
      renderPalette(getP().unlockedTags);
      levelStart = Date.now();
    }

    function run() {
      preview.srcdoc = editor.value;
      setTimeout(() => {
        try {
          const doc = preview.contentDocument || preview.contentWindow.document;
          const ok = LEVELS[levelIdx].validate(doc);
          if (ok) { feedback.innerHTML = '<span class="text-success">Correct! You may proceed.</span>'; btnNext.disabled = false; }
          else { feedback.innerHTML = '<span class="text-warning">Not quite. Recheck the goal and hint.</span>'; btnNext.disabled = true; }
        } catch(e) { feedback.innerHTML = '<span class="text-danger">Unable to validate. Check your HTML.</span>'; btnNext.disabled = true; }
      }, 50);
    }

    function next() {
      const elapsed = Math.round((Date.now() - levelStart) / 1000);
      addCoursePoints(5);
      const unlock = LEVELS[levelIdx].unlock || [];
      const state = getP();
      const set = new Set([...(state.unlockedTags||[]), ...unlock]);
      saveP({ level: state.level, bestTimes: state.bestTimes || {}, unlockedTags: Array.from(set) });
      if (elapsed <= 60 && levelIdx === LEVELS.length - 1) addCourseBadge('HTML Practitioner');
      if (Array.from(set).length >= 8) addCourseBadge('HTML Builder');

      if (levelIdx + 1 >= LEVELS.length) {
        feedback.innerHTML = '<span class="text-success">All levels complete! 🎉</span>';
        btnNext.disabled = true;
        setLevel(LEVELS.length, LEVELS.length);
        pointsEl.textContent = String(coursePoints());
        renderPalette(Array.from(set));
        return;
      }
      levelIdx += 1;
      setLevel(levelIdx + 1, LEVELS.length);
      render();
    }

    function resetAll() {
      saveP({ level: 1, bestTimes: {}, unlockedTags: [] });
      levelIdx = 0; render();
    }

    btnRun.addEventListener('click', run);
    btnNext.addEventListener('click', next);
    btnReset.addEventListener('click', resetAll);
    editor.addEventListener('keydown', function(e){ if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); } });

    render();
  }

  window.addEventListener('load', initHtmlPracticeGame);

})();