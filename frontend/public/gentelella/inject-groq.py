import re

with open("production/orders.html", "r", encoding="utf-8") as f:
    html = f.read()

reps = {
    "Total orders": "Total Review Items",
    "Revenue": "Harmonization Value",
    r"\$84,520": "₹480Cr",
    r"\$3,218 today": "Estimated Savings",
    "Pending": "Pending Groq LPU Review",
    "42": "18",
    "1,240 results": "Pending mapping conflicts",
    "+ Manual order": "+ Run Auto-Mapper",
    "All orders": "HITL Queue Items",
}

for k, v in reps.items():
    safe_k = re.escape(k) if "\\" not in k else k
    html = re.sub(safe_k, v, html)

groq_ui = """
  <!-- Groq Suggestion Modal -->
  <div id="groq-modal" class="card" style="display:none; position:fixed; right:20px; bottom:20px; width:400px; z-index:9999; box-shadow:0 4px 20px rgba(0,0,0,0.15);">
    <div class="card-header" style="background:var(--primary); color:white;">
      <div class="card-title" style="color:white;">Groq Taxonomy Suggestion</div>
      <button onclick="document.getElementById('groq-modal').style.display='none'" style="background:none; border:none; color:white; cursor:pointer;">&times;</button>
    </div>
    <div class="card-body">
      <div id="groq-content" style="font-size:13px; max-height:300px; overflow-y:auto; margin-bottom:10px;">Waiting for LPU Inference...</div>
      <button class="btn btn-sm btn-primary" onclick="document.getElementById('groq-modal').style.display='none'; alert('Mapped!')">Accept Mapping</button>
    </div>
  </div>

  <script>
    window.askGroq = async function(itemDesc) {
      document.getElementById('groq-modal').style.display = 'block';
      document.getElementById('groq-content').innerHTML = `<i>Analyzing via Groq LPU...</i><br/><br/>Legacy Text: <b>${itemDesc}</b>`;

      try {
        const res = await fetch('/api/groq-chat', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ message: `Suggest the correct Shell MESC and UNSPSC mapping for this legacy Oil & Gas equipment description: "${itemDesc}". Be brief.` })
        });
        const data = await res.json();
        if(data.error) document.getElementById('groq-content').innerHTML = `<span class="badge-red">${data.error}</span>`;
        else document.getElementById('groq-content').innerHTML = `<b>Recommended Mapping:</b><br><br>${data.reply.replace(/\\n/g, '<br>')}`;
      } catch(e) {
        document.getElementById('groq-content').innerHTML = `<span class="badge-red">${e.message}</span>`;
      }
    };

    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        document.querySelectorAll('td a.text-dark').forEach(link => {
          const text = link.innerText;
          const btn = document.createElement('button');
          btn.innerHTML = '✨ Groq AI Review';
          btn.className = 'btn btn-outline btn-sm ml-2';
          btn.style.marginLeft = '10px';
          btn.onclick = (e) => { e.preventDefault(); window.askGroq(text); };
          link.parentNode.appendChild(btn);
        });
      }, 500);
    });
  </script>
"""

html = html.replace("</body>", f"{groq_ui}</body>")

with open("production/orders.html", "w", encoding="utf-8") as f:
    f.write(html)
