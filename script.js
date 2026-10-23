/* ==========================================================
   Rotulagem Descomplicada — interações
   1. Mitos e verdades
   2. Jogo da ordem dos ingredientes
   3. Checklist com barra de progresso
   4. Download do template editável
   ========================================================== */

(function () {
  "use strict";

  /* ---------- 1. Mitos e verdades ---------- */
  document.querySelectorAll(".myth").forEach(function (myth) {
    var btn = myth.querySelector(".myth__btn");
    var truth = myth.querySelector(".myth__truth");
    var sign = myth.querySelector(".myth__sign");

    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      truth.hidden = open;
      sign.textContent = open ? "+" : "−";
    });
  });

  /* ---------- 2. Jogo da ordem dos ingredientes ---------- */
  var game = document.getElementById("game");
  if (game) {
    // Ordem correta: do mais pesado para o mais leve (350 g de açúcar, 80 g de água...)
    var correctOrder = ["morango", "acucar", "agua", "limao"];
    var grams = { morango: 600, acucar: 350, agua: 80, limao: 30 };
    var chips = Array.prototype.slice.call(game.querySelectorAll(".chip"));
    var line = document.getElementById("ing-line");
    var hint = document.getElementById("ing-hint");
    var ok = document.getElementById("ing-ok");
    var picked = [];

    var emptyText = "toque nos ingredientes acima, do mais pesado para o mais leve.";

    function nameOf(id) {
      var chip = chips.filter(function (c) {
        return c.dataset.id === id;
      })[0];
      return chip.dataset.name;
    }

    function joinNames(names) {
      if (names.length === 1) return names[0];
      return names.slice(0, -1).join(", ") + " e " + names[names.length - 1];
    }

    function renderGame() {
      chips.forEach(function (chip) {
        chip.disabled = picked.indexOf(chip.dataset.id) >= 0;
      });

      if (picked.length === 0) {
        line.textContent = emptyText;
      } else {
        var names = picked.map(function (id) {
          return nameOf(id).toLowerCase();
        });
        var text = joinNames(names);
        text = text.charAt(0).toUpperCase() + text.slice(1);
        line.textContent = text + (picked.length === correctOrder.length ? "." : "...");
      }

      ok.hidden = picked.length !== correctOrder.length;
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.dataset.id;
        if (picked.indexOf(id) >= 0) return;

        if (id === correctOrder[picked.length]) {
          picked.push(id);
          hint.hidden = true;
          hint.textContent = "";
        } else {
          hint.textContent =
            chip.dataset.name + " (" + grams[id] + " g) ainda não: sobrou um ingrediente mais pesado na fila.";
          hint.hidden = false;
        }
        renderGame();
      });
    });

    document.getElementById("ing-reset").addEventListener("click", function () {
      picked = [];
      hint.hidden = true;
      hint.textContent = "";
      renderGame();
    });

    renderGame();
  }

  /* ---------- 3. Checklist ---------- */
  var checkBoxes = Array.prototype.slice.call(document.querySelectorAll("#check-items input"));
  var progressText = document.getElementById("progress-text");
  var progressBar = document.getElementById("progress-bar");
  var doneBox = document.getElementById("checklist-done");

  function renderChecklist() {
    var total = checkBoxes.length;
    var count = checkBoxes.filter(function (c) {
      return c.checked;
    }).length;

    progressText.textContent = count + " de " + total + " itens";
    progressBar.style.width = Math.round((count / total) * 100) + "%";
    doneBox.hidden = count !== total;
  }

  checkBoxes.forEach(function (box) {
    box.addEventListener("change", renderChecklist);
  });
  renderChecklist();

  /* ---------- 4. Download do template editável ---------- */
  function buildTemplate() {
    var rows = [
      "Valor energético (kcal)",
      "Carboidratos totais (g)",
      "Açúcares totais (g)",
      "Açúcares adicionados (g)",
      "Proteínas (g)",
      "Gorduras totais (g)",
      "Gorduras saturadas (g)",
      "Fibras alimentares (g)",
      "Sódio (mg)"
    ];

    var tableRows = rows
      .map(function (r) {
        return '<tr><td>' + r + '</td><td contenteditable="true">00</td><td contenteditable="true">00</td></tr>';
      })
      .join("");

    var head =
      '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      "<title>Template de rótulo editável</title>" +
      "<style>" +
      "body{margin:0;padding:24px;background:#f6efe6;font-family:Nunito,Arial,sans-serif;color:#2b1d12}" +
      ".aviso{max-width:520px;margin:0 auto 16px;padding:12px 16px;background:#fcf0cc;border-radius:12px;font-size:14px}" +
      ".rotulo{max-width:520px;margin:0 auto;background:#fff;border:2px solid #2b1d12;border-radius:18px;padding:22px;display:flex;flex-direction:column;gap:14px}" +
      ".marca{margin:0;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#b94a0c;font-weight:700}" +
      "h1{margin:0;font-size:34px;line-height:1.1}" +
      "h2{margin:0;font-size:13px;text-transform:uppercase;letter-spacing:.08em}" +
      "p{margin:0;font-size:14px;line-height:1.4}" +
      ".alerg{font-weight:800;text-transform:uppercase}" +
      "table{border-collapse:collapse;width:100%;font-size:13px;border:2px solid #000}" +
      "th,td{border-bottom:1px solid #000;padding:4px 6px;text-align:right}" +
      "th:first-child,td:first-child{text-align:left}" +
      "caption{font-weight:800;text-align:left;padding:6px;font-size:15px;border-bottom:4px solid #000}" +
      ".linha{display:flex;gap:16px;flex-wrap:wrap}.linha p{flex:1 1 140px}" +
      ".guia{font-size:12px;color:#7a5a45}" +
      "[contenteditable]:hover{background:#fff6dc;outline:1px dashed #b94a0c}" +
      "@media print{body{background:#fff;padding:0}.aviso,.guia{display:none}[contenteditable]:hover{background:none;outline:none}}" +
      "</style></head><body>" +
      '<div class="aviso"><b>Como usar:</b> clique em qualquer texto para editar. Os números e nomes abaixo são exemplos. Para guardar em PDF, use a opção Imprimir do navegador. Confira as regras atuais da ANVISA antes de imprimir.</div>' +
      '<div class="rotulo">' +
      '<p class="marca" contenteditable="true">Sua marca</p>' +
      '<h1 contenteditable="true">Geleia de morango</h1>' +
      '<p class="guia">Passo 1: nome do produto (o que ele é) e peso líquido.</p>' +
      '<div><h2>Ingredientes</h2><p contenteditable="true">Morango, açúcar, água e suco de limão.</p></div>' +
      '<p class="alerg" contenteditable="true">Alérgicos: não contém alérgenos de declaração obrigatória (ajuste para a sua receita).</p>' +
      '<p class="alerg" contenteditable="true">Não contém glúten</p>' +
      '<p class="guia">Passo 2: ingredientes do maior para o menor peso, e aviso de alergênicos logo depois.</p>' +
      "<table><caption>INFORMAÇÃO NUTRICIONAL</caption>" +
      '<tr><td colspan="3" contenteditable="true">Porções por embalagem: 00 | Porção: 00 g (medida caseira)</td></tr>' +
      "<tr><th></th><th>100 g</th><th>Por porção</th></tr>";

    var tail =
      "</table>" +
      '<p class="guia">Passo 3: preencha os valores com os dados da análise ou do cálculo do seu produto. Letras pretas em fundo branco.</p>' +
      '<div class="linha"><p><b>Peso líquido:</b> <span contenteditable="true">320 g</span></p><p><b>Lote:</b> <span contenteditable="true">L2610A</span></p><p><b>Validade:</b> <span contenteditable="true">03/2027</span></p></div>' +
      '<p contenteditable="true">Após aberto, conservar sob refrigeração.</p>' +
      '<p contenteditable="true"><b>Sua Razão Social ou Nome</b><br>Rua Exemplo, 000, Bairro, Cidade/UF<br>CNPJ 00.000.000/0000-00<br>Indústria Brasileira</p>' +
      '<p class="guia">Passo 4: validade, lote e origem.</p>' +
      "</div></body></html>";

    return head + tableRows + tail;
  }

  var downloadBtn = document.getElementById("download-btn");
  var downloadMsg = document.getElementById("download-msg");

  downloadBtn.addEventListener("click", function () {
    try {
      var blob = new Blob([buildTemplate()], { type: "text/html;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "template-rotulo-editavel.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1000);
      downloadMsg.textContent = "Pronto! Abra o arquivo no navegador, clique nos textos para editar e imprima.";
    } catch (e) {
      downloadMsg.textContent = "Não foi possível baixar agora. Tente de novo em instantes.";
    }
  });
})();
