# Rotulagem Descomplicada: O Guia do Produtor Artesanal

Landing page interativa que traduz as regras de rotulagem da ANVISA para pequenos produtores de alimentos (geleias, doces e similares), sem juridiquês.

Baseada em:

- RDC 727/2022 (rotulagem geral)
- RDC 429/2020 e IN 75/2020 (rotulagem nutricional)
- Lei 10.674/2003 (glúten)

> Conteúdo informativo. Não substitui o texto oficial das normas. A ANVISA está revisando a regra geral de rotulagem, então confira atualizações antes de imprimir rótulos.

## Estrutura

```
index.html   Marcação da página (hero, empatia, trilha de 4 passos, checklist, CTA)
style.css    Estilos, paleta e responsividade
script.js    Interações: mitos e verdades, jogo dos ingredientes, checklist, download do template
```

Sem dependências nem etapa de build. As fontes (Fredoka e Nunito) vêm do Google Fonts.

## Rodar localmente

Abra o `index.html` no navegador, ou use a extensão **Live Server** no VS Code.

## Publicar no GitHub Pages

1. Envie os arquivos para um repositório no GitHub.
2. Em **Settings > Pages**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. Salve. O site fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Botão de download

O botão "Baixar Template Gratuito de Rótulo Editável" gera um arquivo HTML editável direto no navegador (função `buildTemplate` em `script.js`). Para entregar um arquivo seu (PDF, Canva, DOCX), coloque-o na pasta do projeto e troque o `<button id="download-btn">` por um link:

```html
<a class="btn btn--big" href="template-rotulo.pdf" download>Baixar Template Gratuito de Rótulo Editável</a>
```
