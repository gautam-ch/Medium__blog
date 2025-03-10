// File: src/utils/quillFontConfig.ts
import Quill from 'quill';

// Define the font formats we want to support
export const fontFormats = [
  'serif',
  'monospace',
  'arial',
  'times-new-roman',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'impact',
  'verdana'
];

// Register the fonts with Quill
const Font = Quill.import('formats/font');
Font.whitelist = fontFormats;
Quill.register(Font, true);

// Complete modules configuration with all toolbar options
export const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'font': fontFormats }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  }
};