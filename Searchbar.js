// ============================================================
//  Casa Piedra — Site Search
//  File: search.js
//  Drop this file in the same folder as Home.html
// ============================================================
 
// ── 1. SITE INDEX ──────────────────────────────────────────
//  Add or remove entries here whenever you add new pages.
//  Each entry needs:
//    label    → text shown in the dropdown
//    url      → the file to navigate to on click
//    keywords → extra words that should match this result
// ───────────────────────────────────────────────────────────
const SITE_INDEX = [
  {
    label: "Home",
    url: "Home.html",
    keywords: ["home", "main", "start", "landing"]
  },
  {
    label: "About Us",
    url: "AboutUs.html",
    keywords: ["about", "us", "story", "brand", "company", "who"]
  },
  {
    label: "Expert Corner",
    url: "Expert Corner.html",
    keywords: ["expert", "corner", "advice", "guide", "tips", "professional"]
  },
  {
    label: "Tile Comparison",
    url: "comparision.html",
    keywords: ["compare", "comparison", "versus", "vs", "tile", "difference"]
  },
  {
    label: "Wall Tiles",
    url: "Wall tiles.html",
    keywords: ["wall", "tiles", "bathroom wall", "kitchen wall", "vertical", "ceramic", "porcelain wall"]
  },
  {
    label: "Floor Tiles",
    url: "Floor tiles.html",
    keywords: ["floor", "tiles", "flooring", "ground", "porcelain floor", "slip", "outdoor floor"]
  },
  {
    label: "Special Tiles",
    url: "Special Tiles.html",
    keywords: ["special", "mosaic", "accent", "decorative", "feature", "unique", "luxury"]
  },
  {
    label: "All Products",
    url: "Tiles.html",
    keywords: ["all", "products", "tiles", "catalogue", "catalog", "collection", "shop"]
  },
  {
    label: "Bathroom Flooring",
    url: "Floor tiles.html",
    keywords: ["bathroom", "bath", "wet", "floor", "porcelain", "r10", "slip", "matte", "honed"]
  },
  {
    label: "Luxury Lounge Tiles",
    url: "Floor tiles.html",
    keywords: ["lounge", "living", "luxury", "terrazzo", "seamless", "interior"]
  },
  {
    label: "Executive Workspace Tiles",
    url: "Floor tiles.html",
    keywords: ["workspace", "office", "executive", "commercial", "obsidian", "statuario"]
  },
];
 
 
// ── 2. DOM REFERENCES ──────────────────────────────────────
const searchInput    = document.getElementById("siteSearchInput");
const searchDropdown = document.getElementById("searchDropdown");
 
 
// ── 3. SEARCH LOGIC ────────────────────────────────────────
function getMatches(query) {
  if (!query || query.trim().length < 1) return [];
  const q = query.toLowerCase().trim();
 
  return SITE_INDEX.filter(item => {
    // Match against label or any keyword
    const inLabel    = item.label.toLowerCase().includes(q);
    const inKeywords = item.keywords.some(kw => kw.includes(q));
    return inLabel || inKeywords;
  });
}
 
 
// ── 4. RENDER DROPDOWN ─────────────────────────────────────
function renderDropdown(matches, query) {
  searchDropdown.innerHTML = "";
 
  if (matches.length === 0) {
    searchDropdown.innerHTML = `
      <div class="search-no-result">No results for "<strong>${escapeHtml(query)}</strong>"</div>
    `;
    searchDropdown.classList.add("open");
    return;
  }
 
  matches.forEach(item => {
    const div = document.createElement("div");
    div.className = "search-result-item";
 
    // Highlight the matching portion of the label
    const highlighted = highlightMatch(item.label, query);
    div.innerHTML = `<span class="result-icon">→</span> ${highlighted}`;
 
    div.addEventListener("mousedown", () => {
      // mousedown fires before blur, so navigation works cleanly
      window.location.href = item.url;
    });
 
    searchDropdown.appendChild(div);
  });
 
  searchDropdown.classList.add("open");
}
 
 
// ── 5. HELPERS ─────────────────────────────────────────────
function highlightMatch(label, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  return escapeHtml(label).replace(regex, `<mark>$1</mark>`);
}
 
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
 
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
 
function closeDropdown() {
  searchDropdown.innerHTML = "";
  searchDropdown.classList.remove("open");
}
 
 
// ── 6. EVENT LISTENERS ─────────────────────────────────────
 
// Live filter as user types
searchInput.addEventListener("input", () => {
  const q = searchInput.value;
  if (q.trim().length === 0) {
    closeDropdown();
    return;
  }
  const matches = getMatches(q);
  renderDropdown(matches, q);
});
 
// Navigate to first result on Enter key
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = searchInput.value.trim();
    if (!q) return;
    const matches = getMatches(q);
    if (matches.length > 0) {
      window.location.href = matches[0].url;
    }
  }
 
  // Arrow key navigation inside dropdown
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    const items = searchDropdown.querySelectorAll(".search-result-item");
    if (items.length === 0) return;
    e.preventDefault();
 
    let active = searchDropdown.querySelector(".search-result-item.focused");
    let idx = Array.from(items).indexOf(active);
 
    if (active) active.classList.remove("focused");
 
    if (e.key === "ArrowDown") {
      idx = (idx + 1) % items.length;
    } else {
      idx = (idx - 1 + items.length) % items.length;
    }
 
    items[idx].classList.add("focused");
    searchInput.value = items[idx].textContent.replace("→", "").trim();
  }
 
  if (e.key === "Escape") closeDropdown();
});
 
// Close dropdown when user clicks elsewhere
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrapper")) {
    closeDropdown();
  }
});