// Load PDF list from JSON, then call renderArchives()
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("../scripts/pdfs.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const pdfList = await response.json();
    renderArchives(pdfList);
    
    const container = document.getElementById("archives");
    container.classList.remove("loading");
    
  } catch (error) {
    console.error("Failed to load PDFs:", error);
    document.getElementById("archives").innerHTML = 
      '<div class="error">Failed to load archive list. ' +
      '<a href="./archives/">Browse manually</a></div>';
  }
});