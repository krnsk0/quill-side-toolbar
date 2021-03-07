import Quill, { QuillOptionsStatic } from 'quill';

const addClickHandler = (id: string, handler: () => void) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', handler);
};

const options: QuillOptionsStatic = {
  theme: 'snow',
  modules: { toolbar: false },
};

const q = new Quill('#editor', options);

addClickHandler('bold', () => {
  const format = q.getFormat();
  if (format.bold) q.format('bold', 0);
  else q.format('bold', 1);
});

addClickHandler('italic', () => {
  const format = q.getFormat();
  if (format.italic) q.format('italic', 0);
  else q.format('italic', 1);
});

addClickHandler('underline', () => {
  const format = q.getFormat();
  if (format.underline) q.format('underline', 0);
  else q.format('underline', 1);
});
