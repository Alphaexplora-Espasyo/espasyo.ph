const https = require('https');
const urls = [
  'https://res.cloudinary.com/dlk93aehl/image/upload/polaroids/team.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/v1/polaroids/team.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/team.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/v1/team.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/360/Nav3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/v1/360/Nav3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/Nav3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/v1/Nav3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/footer-img/BIR.png',
  'https://res.cloudinary.com/dlk93aehl/image/upload/BIR.png'
];
urls.forEach(url => {
  https.get(url, (res) => {
    console.log(res.statusCode + ' - ' + url);
  });
});
