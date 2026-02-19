function renderArchives(pdfItems) {
  const container = document.getElementById("archives");
  container.innerHTML = ""; // Clear loading message

  // Group by year
  const byYear = {};
  pdfItems.forEach(item => {
    if (!byYear[item.year]) byYear[item.year] = [];
    byYear[item.year].push(item);
  });

  // Sort years (newest first)
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  years.forEach(year => {
    const yearBlock = document.createElement("section");
    yearBlock.className = "year-block";

    const title = document.createElement("div");
    title.className = "year-title";
    title.textContent = year;
    yearBlock.appendChild(title);

    const listEl = document.createElement("ul");

    // Sort files alphabetically by label
    byYear[year].sort((a, b) => a.label.localeCompare(b.label));

    byYear[year].forEach(item => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "./archives/" + item.file;
      link.textContent = item.label;
      link.target = "_blank";
      li.appendChild(link);
      listEl.appendChild(li);
    });

    yearBlock.appendChild(listEl);
    container.appendChild(yearBlock);
  });
}
