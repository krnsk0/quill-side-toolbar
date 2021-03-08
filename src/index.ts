import Quill, { QuillOptionsStatic } from 'quill';

const select = <T>(id: string): T => <T>(<unknown>document.getElementById(id));

const options: QuillOptionsStatic = {
  theme: 'snow',
  modules: { toolbar: false },
};

const q = new Quill('#editor', options);

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
  // have to pass in empty string for 'normal'
  q.format('size', size === 'normal' ? '' : size);
});

select<HTMLSelectElement>('font').addEventListener('change', (e) => {
  const font = (<HTMLInputElement>e?.target).value;
  q.format('font', font);
});
