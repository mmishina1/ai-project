/* AI. A Biography — interactions: chapter cards, album, game, endings */
(function () {
  var S = {
    review: ["arxiv.org", "History of AI (PET Clinics review, 2021)", "https://arxiv.org/pdf/2109.01517"],
    umbc: ["ai.umbc.edu", "70 years of the term “artificial intelligence”", "https://ai.umbc.edu/news/post/151898/"],
    collins: ["rnz.co.nz", "AI named word of the year by Collins Dictionary", "https://www.rnz.co.nz/news/world/501531/ai-named-word-of-the-year-by-collins-dictionary"],
    smith: ["smithsonianmag.com", "Words of the year 2025", "https://www.smithsonianmag.com/smart-news/rage-bait-which-desribes-online-content-created-to-make-us-mad-is-oxfords-2025-word-of-the-year-180987776/"],
    mw: ["merriam-webster.com", "Word of the year 2025: slop", "https://www.merriam-webster.com/wordplay/word-of-the-year"],
    euro: ["euronews.com", "Macquarie Dictionary: AI slop", "https://www.euronews.com/2025/11/26/ai-slop-macquarie-dictionarys-word-of-the-year-is-a-sad-reflection-of-modern-anxieties"],
    go: ["blog.google", "AlphaGo vs Lee Sedol", "https://blog.google/technology/ai/alphagos-ultimate-challenge/"],
    attn: ["arxiv.org", "Attention Is All You Need (2017)", "https://arxiv.org/abs/1706.03762"],
    c4: ["washingtonpost.com", "Inside the secret list of websites that make AI smart", "https://www.washingtonpost.com/technology/interactive/2023/ai-chatbot-learning/"],
    img: ["washingtonpost.com", "How AI image generators work", "https://www.washingtonpost.com/technology/interactive/2022/ai-image-generator/"],
    gem: ["yahoo.com", "Google reports scale of complaints about AI (Reuters)", "https://www.yahoo.com/news/google-reports-scale-complaints-ai-130346911.html"],
    phys: ["sciencenews.org", "2024 Nobel Prize in Physics", "https://www.sciencenews.org/article/nobel-physics-2024-machine-learning"],
    chem: ["dailymaverick.co.za", "2024 Nobel Prize in Chemistry (Reuters)", "https://www.dailymaverick.co.za/article/2024-10-09-baker-hassabis-jumper-win-2024-nobel-prize-in-chemistry/"],
    moz: ["hacks.mozilla.org", "Behind the scenes: hardening Firefox", "https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/"],
    bill: ["tonko.house.gov", "Power for the People Act fact sheet", "https://tonko.house.gov/uploadedfiles/power_for_the_people_fact_sheet_4.26.pdf"],
    pf: ["politifact.com", "Data centres and rising electricity costs", "https://politifact.com/factchecks/2026/jun/12/elizabeth-warren/data-centers-rising-electricity-costs/"],
    scmp: ["scmp.com", "Hong Kong office loses HK$200 million to deepfake call", "https://www.scmp.com/news/hong-kong/law-and-crime/article/3250851/everyone-looked-real-multinational-firms-hong-kong-office-loses-hk200-million-after-scammers-stage"],
    metr: ["metr.org", "Review of the OpenAI / Hugging Face incident", "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/"],
    nist: ["nist.gov", "AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"]
  };
  var CH = {
    home: ["Introduction", "Home", ["umbc", "collins", "smith", "mw", "euro"]],
    ch0: ["The dream", "Chapter 0 · 1950", ["review"]],
    ch1: ["Birth and first words", "Chapter 1 · 1955–1966", ["umbc", "review"]],
    ch2: ["A hard childhood", "Chapter 2 · 1966–1990s", ["review"]],
    ch3: ["First victories", "Chapter 3 · 1997–2016", ["review", "go"]],
    ch4: ["School", "Chapter 4 · 2017–2022", ["attn", "c4"]],
    ch5: ["Talents", "Chapter 5 · Benefits and useful applications", ["gem", "collins", "phys", "chem", "review", "moz"]],
    ch6: ["A difficult character", "Chapter 6 · Challenges and risks", ["bill", "pf", "c4", "img", "scmp", "metr"]],
    ch7: ["Who will it become?", "Chapter 7 · Possible futures", ["phys", "nist"]]
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pill(k) { var s = S[k]; return '<a class="source" href="' + esc(s[2]) + '" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true"><use href="#i-link"/></svg><b>' + esc(s[0]) + '</b><span>· ' + esc(s[1]) + '</span></a>'; }

  // Story card with sources
  var dlg = document.getElementById("card"), opener = null;
  document.querySelectorAll("[data-sources]").forEach(function (b) {
    b.setAttribute("aria-haspopup", "dialog");
    b.addEventListener("click", function () {
      var c = CH[b.dataset.sources]; opener = b;
      document.getElementById("card-title").textContent = c[0];
      document.getElementById("card-meta").textContent = c[1];
      document.getElementById("card-sources").innerHTML = c[2].map(pill).join("");
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    });
  });
  document.getElementById("card-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", function () { if (opener) opener.focus(); });

  // Reference list
  var grid = document.getElementById("ref-grid");
  grid.innerHTML = Object.keys(CH).map(function (k) {
    var c = CH[k];
    return '<div><h3>' + esc(c[0]) + '</h3><ol>' + c[2].map(function (s) { return '<li><a href="' + esc(S[s][2]) + '" target="_blank" rel="noopener noreferrer">' + esc(S[s][1]) + '</a> · ' + esc(S[s][0]) + '</li>'; }).join("") + '</ol></div>';
  }).join("");

  // Be the AI
  var rounds = [
    { s: "The cat sat on the ___", o: [["mat", 70], ["floor", 20], ["keyboard", 10]], n: "Most likely word wins. That’s the whole trick." },
    { s: "After the breakup, she texted him: “___”", o: [["Hi", 34], ["Sorry", 33], ["Why?", 33]], n: "No clear winner. That’s why AI answers differently every time." },
    { s: "The capital of Australia is ___", o: [["Sydney", 55], ["Canberra", 45]], n: "Likely isn’t true: it’s Canberra. That’s how AI gets things confidently wrong." }
  ];
  var r = 0, opts = document.getElementById("options"), note = document.getElementById("game-note"), next = document.getElementById("next-round");
  function draw() {
    var d = rounds[r];
    document.getElementById("round-label").textContent = "Round " + (r + 1) + " of 3";
    document.getElementById("sentence").innerHTML = esc(d.s).replace("___", '<span class="slot" id="slot">___</span>');
    note.textContent = ""; next.hidden = true;
    opts.innerHTML = d.o.map(function (o, i) { return '<button type="button" class="option" aria-pressed="false" data-i="' + i + '"><span class="bar" aria-hidden="true"></span><span>' + esc(o[0]) + '</span><span class="pct"></span></button>'; }).join("");
  }
  opts.addEventListener("click", function (e) {
    var b = e.target.closest(".option"); if (!b || b.disabled) return;
    var d = rounds[r], i = +b.dataset.i;
    opts.querySelectorAll(".option").forEach(function (x, j) {
      x.querySelector(".bar").style.width = d.o[j][1] + "%";
      x.querySelector(".pct").textContent = d.o[j][1] + "%";
      if (j === i) x.setAttribute("aria-pressed", "true"); else x.disabled = true;
    });
    document.getElementById("slot").textContent = d.o[i][0];
    note.textContent = d.n;
    next.hidden = false; next.textContent = r < 2 ? "Next round" : "Play again";
  });
  next.addEventListener("click", function () { r = (r + 1) % 3; draw(); opts.querySelector(".option").focus(); });
  draw();

  // Endings
  var endings = document.querySelectorAll(".ending");
  endings.forEach(function (b) {
    b.addEventListener("click", function () {
      endings.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      document.getElementById("choice-line").textContent = "Your ending: " + b.querySelector("b").textContent;
    });
  });

  // Chapter decks: each part shows its chapters as a horizontal row of cards; a card opens the chapter
  var all = [];
  document.querySelectorAll(".part").forEach(function (part) {
    var chs = [], el = part.nextElementSibling;
    while (el && el.classList.contains("chapter")) { chs.push(el); el = el.nextElementSibling; }
    var deck = document.createElement("div"); deck.className = "deck";
    if (part.id === "past") deck.classList.add("vintage");
    if (part.id === "present") deck.classList.add("modern");
    if (part.id === "future") deck.classList.add("tbc");
    var track = document.createElement("div"); track.className = "track"; track.setAttribute("role", "list"); track.tabIndex = 0;
    track.setAttribute("aria-label", part.querySelector("h2").textContent);
    deck.appendChild(track);
    var ctr = document.createElement("div"); ctr.className = "deck-ctrl";
    ctr.innerHTML = '<button class="btn icon" type="button" aria-label="Scroll left"><svg aria-hidden="true"><use href="#i-left"/></svg></button><button class="btn icon" type="button" aria-label="Scroll right"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>';
    part.appendChild(ctr);
    var bs = ctr.querySelectorAll("button");
    bs[0].addEventListener("click", function () { track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" }); });
    bs[1].addEventListener("click", function () { track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" }); });
    part.after(deck);
    function fit() { ctr.hidden = track.scrollWidth <= track.clientWidth + 4; }
    window.addEventListener("resize", fit); setTimeout(fit, 0);
    chs.forEach(function (ch) {
      var n = all.length, head = ch.querySelector(".ch-head"), win = head.querySelector(".window");
      var tone = (win.className.match(/tone-\w+/) || ["tone-sun"])[0];
      var kicker = head.querySelector(".kicker"), title = head.querySelector("h3");
      var sr = title.querySelector(".sr"); if (sr) sr.remove();
      title.id = ch.id + "-t";
      var fig = ch.querySelector(".photo-fig");
      var card = document.createElement("div"); card.className = "ch-card"; card.setAttribute("role", "listitem");
      var media = document.createElement("div"); media.className = "ch-media";
      if (fig) media.appendChild(fig);
      else { media.innerHTML = '<div class="photo ' + tone + '"></div>'; }
      var badge = document.createElement("span"); badge.className = "ch-badge " + tone; badge.setAttribute("aria-hidden", "true"); badge.textContent = win.textContent.trim();
      media.appendChild(badge);
      var meta = document.createElement("div"); meta.className = "ch-meta";
      meta.appendChild(kicker); meta.appendChild(title);
      var go = document.createElement("button"); go.type = "button"; go.className = "ch-go " + tone; go.setAttribute("aria-haspopup", "dialog");
      go.setAttribute("aria-label", "Open chapter " + badge.textContent + ": " + title.textContent);
      go.innerHTML = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
      card.appendChild(media); card.appendChild(meta); card.appendChild(go);
      track.appendChild(card);
      head.remove();
      // the chapter itself goes into a dialog
      var dlg = document.createElement("dialog"); dlg.className = "chapter-dlg"; dlg.setAttribute("aria-labelledby", title.id);
      dlg.innerHTML = '<div class="dlg-bar ' + tone + '"><span class="dlg-title"><b>Chapter ' + badge.textContent + '</b></span><span class="dlg-nav"><button class="btn icon" type="button" data-step="-1" aria-label="Previous chapter"><svg aria-hidden="true"><use href="#i-left"/></svg></button><button class="btn icon" type="button" data-step="1" aria-label="Next chapter"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button><button class="btn icon" type="button" data-close aria-label="Close"><svg aria-hidden="true"><use href="#i-close"/></svg></button></span></div>';
      var inner = document.createElement("div"); inner.className = "dlg-body";
      dlg.appendChild(inner); inner.appendChild(ch);
      document.body.appendChild(dlg);
      all.push({ dlg: dlg, go: go, card: card });
      function open() { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); inner.scrollTop = 0; }
      go.addEventListener("click", open);
      card.addEventListener("click", function (e) { if (e.target.closest("a, .ch-go")) return; open(); });
      dlg.addEventListener("click", function (e) {
        if (e.target === dlg || e.target.closest("[data-close]")) { dlg.close(); return; }
        var st = e.target.closest("[data-step]");
        if (st) { var k = (n + (+st.dataset.step) + all.length) % all.length; dlg.close(); all[k].card.scrollIntoView({ block: "nearest", inline: "center" }); var d2 = all[k].dlg; if (d2.showModal) d2.showModal(); else d2.setAttribute("open", ""); d2.querySelector(".dlg-body").scrollTop = 0; }
      });
      dlg.addEventListener("close", function () { if (!document.querySelector("dialog.chapter-dlg[open]")) go.focus({ preventScroll: true }); });
    });
  });
  // Hero: family album; each snapshot opens its chapter
  (function () {
    var album = document.getElementById("album");
    var items = [{"img": "assets/album-punch-cards.jpg", "label": "Punch cards", "to": "ch2"}, {"img": "assets/album-chess-1997.jpg", "label": "Chess, 1997", "to": "ch3"}, {"img": "assets/album-go-2016.jpg", "label": "Go, 2016", "to": "ch3"}, {"html": "<div class=\"doc\" data-refs><p class=\"doc-t\">A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence</p><p>J. McCarthy, Dartmouth College<br>M. L. Minsky, Harvard University<br>N. Rochester, I.B.M. Corporation<br>C. E. Shannon, Bell Telephone Laboratories</p><p>August 31, 1955</p></div>", "label": "Born! 1955\u201356", "to": "home"}, {"img": "assets/album-school.jpg", "label": "School", "to": "ch4"}, {"img": "assets/album-today.jpg", "label": "Today", "to": "ch6"}, {"html": "<div class=\"chat\"><p class=\"me\">what should I reply to my ex?</p><p class=\"bot\"><i></i><i></i><i></i></p></div>", "label": "Viral, 2022", "to": "ch5"}];
    var pos = [[0, 3, -6], [21, 0, 3], [42, 4, -3], [63, 1, 6], [8, 50, 4], [33, 54, -5], [58, 49, 7]];
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    items.forEach(function (it, k) {
      var b = document.createElement("button"); b.type = "button"; b.className = "snap";
      b.style.setProperty("--x", pos[k][0] + "%"); b.style.setProperty("--y", pos[k][1] + "%"); b.style.setProperty("--r", pos[k][2] + "deg");
      b.style.setProperty("--dx", (40 - pos[k][0]) * 3 + "px"); b.style.setProperty("--dy", (30 - pos[k][1]) * 4 + "px");
      b.style.transitionDelay = reduce ? "0s" : (0.15 + k * 0.12) + "s";
      b.setAttribute("aria-label", it.label + ": open " + (it.to === "home" ? "the introduction" : "the chapter"));
      if (!it.img) b.classList.add("art");
      b.innerHTML = (it.img ? '<img alt="" src="' + it.img + '">' : '<div class="snap-art" aria-hidden="true">' + it.html + '</div>') + '<span>' + esc(it.label) + '</span>';
      b.addEventListener("click", function (e) {
        if (b.dataset.dragged === "1") { b.dataset.dragged = ""; e.preventDefault(); return; }
        if (it.to === "home") { document.getElementById("home").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); return; }
        var hit = all.filter(function (a) { return a.dlg.querySelector("#" + it.to); })[0];
        if (hit) { if (hit.dlg.showModal) hit.dlg.showModal(); else hit.dlg.setAttribute("open", ""); }
      });
      album.appendChild(b);
    });
    // drag snapshots around
    var topZ = 10;
    album.querySelectorAll(".snap").forEach(function (b) {
      var sx, sy, ox, oy, moved = false, id = null;
      b.addEventListener("pointerdown", function (e) {
        if (e.button !== 0) return;
        id = e.pointerId; moved = false; sx = e.clientX; sy = e.clientY; ox = b.offsetLeft; oy = b.offsetTop;
        b.style.zIndex = ++topZ;
      });
      b.addEventListener("pointermove", function (e) {
        if (e.pointerId !== id) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 6) return;
        if (!moved) { moved = true; try { b.setPointerCapture(id); } catch (err) {} b.classList.add("dragging"); }
        var maxX = album.clientWidth - b.offsetWidth, maxY = album.clientHeight - b.offsetHeight;
        b.style.left = Math.max(-20, Math.min(maxX + 20, ox + dx)) + "px";
        b.style.top = Math.max(-20, Math.min(maxY + 20, oy + dy)) + "px";
      });
      function end() { if (id === null) return; id = null; b.classList.remove("dragging"); if (moved) b.dataset.dragged = "1"; }
      b.addEventListener("pointerup", end); b.addEventListener("pointercancel", end);
    });
    if (!reduce) { album.classList.add("deal"); void album.offsetWidth; setTimeout(function () { album.classList.remove("deal"); }, 60); }
  })();
})();
