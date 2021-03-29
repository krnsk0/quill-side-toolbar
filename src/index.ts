import Quill, { QuillOptionsStatic } from 'quill';
import { QuillDeltaToHtmlConverter as Q2H } from 'quill-delta-to-html';

const select = <T>(id: string): T => <T>(<unknown>document.getElementById(id));

// create and configure quill
const options: QuillOptionsStatic = {
  theme: 'snow',
  modules: {
    toolbar: false,
    keyboard: {
      bindings: {
        tab: {
          key: 9,
          handler: function () {
            // do nothing
          },
        },
        'remove tab': {
          key: 9,
          shiftKey: true,
          collapsed: true,
          prefix: /\t$/,
          handler: function () {
            // do nothing
          },
        },
      },
    },
  },
  formats: [
    'background',
    'bold',
    'color',
    'font',
    'italic',
    'size',
    'underline',
    'align',
  ],
};

const fontSizeStyle = Quill.import('attributors/style/size');
fontSizeStyle.whitelist = ['0.5em', '1.5em', '2em', '2.5em'];
Quill.register(fontSizeStyle, true);

const q = new Quill('#editor', options);
q.format('size', '2.5em');
q.insertText(0, 'line1\nline2\nline3\nline4\nline5', { size: '2.5em' });

/*
q.setContents(<Delta>(<unknown>[
  { insert: 'Image Size' },
  { attributes: { header: 2 }, insert: '\n' },
  {
    insert:
      'Here we use the style attribute to specify the width and height of an image:\n',
  },
  {
    attributes: { alt: 'Girl in a jacket' },
    insert: { image: 'https://www.w3schools.com/html/img_girl.jpg' },
  },
  { insert: '\n' },
]));
*/

// selectors and behavior
const quillElement = select<HTMLDivElement>('editor');
const quillOverlay = select<HTMLDivElement>('editor-overlay');
const editorPosition = select<HTMLDivElement>('editor-position');

let width = 400;
let height = 200;

select<HTMLInputElement>('width-slider').addEventListener('input', (e) => {
  const value = +(<HTMLInputElement>e?.target).value;
  const adjusted = value / 30;
  width = value;
  editorPosition.style.width = `${value}px`;
  quillElement.style.fontSize = `${adjusted}px`;
});

select<HTMLInputElement>('height-slider').addEventListener('input', (e) => {
  const value = +(<HTMLInputElement>e?.target).value;
  height = value;
  editorPosition.style.height = `${value}px`;
});

select<HTMLInputElement>('x-slider').addEventListener('input', (e) => {
  const value = +(<HTMLInputElement>e?.target).value;
  editorPosition.style.left = `${Math.min(value, 800 - width)}px`;
});

select<HTMLInputElement>('y-slider').addEventListener('input', (e) => {
  const value = +(<HTMLInputElement>e?.target).value;
  editorPosition.style.top = `${Math.min(value, 400 - height)}px`;
});

select<HTMLButtonElement>('bold').addEventListener('click', () => {
  const format = q.getFormat();
  if (format.bold) q.format('bold', 0);
  else q.format('bold', 1);
});

select<HTMLButtonElement>('italic').addEventListener('click', () => {
  const format = q.getFormat();
  if (format.italic) q.format('italic', 0);
  else q.format('italic', 1);
});

select<HTMLButtonElement>('underline').addEventListener('click', () => {
  const format = q.getFormat();
  if (format.underline) q.format('underline', 0);
  else q.format('underline', 1);
});

select<HTMLInputElement>('color').addEventListener('change', (e) => {
  const color = (<HTMLInputElement>e?.target).value;
  q.format('color', color);
});

select<HTMLInputElement>('bg-color').addEventListener('change', (e) => {
  const color = (<HTMLInputElement>e?.target).value;
  q.format('background', color);
});

select<HTMLSelectElement>('size').addEventListener('change', (e) => {
  const size = (<HTMLInputElement>e?.target).value;
  q.format('size', size);
});

select<HTMLSelectElement>('font').addEventListener('change', (e) => {
  const font = (<HTMLInputElement>e?.target).value;
  q.format('font', font);
});

select<HTMLSelectElement>('align').addEventListener('change', (e) => {
  const align = (<HTMLInputElement>e?.target).value;
  q.format('align', align);
});

select<HTMLSelectElement>('vertical-align').addEventListener('change', (e) => {
  const vAlign = (<HTMLInputElement>e?.target).value;
  console.log('vAlign: ', vAlign);

  const editorChild = <HTMLDivElement>quillElement.firstChild;

  if (editorChild) {
    editorChild.style.justifyContent = vAlign;
  }
});

const deltaContainer = select<HTMLDivElement>('delta');

q.on('text-change', () => {
  const rawDelta = q.getContents();

  deltaContainer.innerText = '';

  rawDelta.forEach((d) => {
    deltaContainer.innerHTML += JSON.stringify(d) + '<br/>';
  });
});

quillOverlay.addEventListener('click', () => {
  console.log('overlay clicked');
  quillOverlay.style.display = 'none';
  q.focus();
});

window.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  console.log('target', target);

  if (
    target.id === 'editor' ||
    target.id === 'editor-overlay' ||
    quillElement.contains(target)
  ) {
    return;
  }
  quillOverlay.style.display = 'inherit';
});

q.blur();
