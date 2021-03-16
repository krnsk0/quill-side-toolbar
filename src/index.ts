import Quill, { QuillOptionsStatic } from 'quill';

const select = <T>(id: string): T => <T>(<unknown>document.getElementById(id));

// create and configure quill
const options: QuillOptionsStatic = {
  theme: 'snow',
  modules: { toolbar: false },
};

const fontSizeStyle = Quill.import('attributors/style/size');
fontSizeStyle.whitelist = ['0.5em', '1.5em', '2em', '2.5em'];
Quill.register(fontSizeStyle, true);

const q = new Quill('#editor', options);
q.format('size', '2.5em');
q.insertText(0, 'line1\nline2\nline3\nline4\nline5', { size: '2.5em' });

// selectors and behavior
const quillElement = select<HTMLDivElement>('editor');

let width = 400;
let height = 200;

select<HTMLInputElement>('width-slider').addEventListener('input', (e) => {
  const value = +(<HTMLInputElement>e?.target).value;
  const adjusted = value / 30;
  width = value;
  quillElement.style.width = `${value}px`;
  quillElement.style.fontSize = `${adjusted}px`;
});

select<HTMLInputElement>('height-slider').addEventListener('input', (e) => {
  const value = +(<HTMLInputElement>e?.target).value;
  height = value;
  quillElement.style.height = `${value}px`;
});

select<HTMLInputElement>('x-slider').addEventListener('input', (e) => {
  const value = +(<HTMLInputElement>e?.target).value;
  quillElement.style.left = `${Math.min(value, 800 - width)}px`;
});

select<HTMLInputElement>('y-slider').addEventListener('input', (e) => {
  const value = +(<HTMLInputElement>e?.target).value;
  quillElement.style.top = `${Math.min(value, 400 - height)}px`;
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

  const editorChild = <HTMLDivElement>(
    select<HTMLSelectElement>('editor').firstChild
  );

  editorChild.style.justifyContent = vAlign;
});

const deltaContainer = select<HTMLDivElement>('delta');

q.on('text-change', () => {
  const rawDelta = q.getContents();

  deltaContainer.innerText = '';

  rawDelta.forEach((d) => {
    deltaContainer.innerHTML += JSON.stringify(d) + '<br/>';
  });
});
