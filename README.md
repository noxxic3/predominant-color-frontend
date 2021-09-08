# [Technical test] Image predominant color (Frontend)

Frontend part of a small full-stack project that allows uploading an image file, calculating its predominant color, 
and displaying the color closest to it from a given color palette, using the 
<a href="https://github.com/thephpleague/color-extractor" target="_blank">color-extractor</a> library in the backend.

## Project Set Up

### Installation & Set Up

1. Install Vue CLI
```
npm install -g @vue/cli
```

2. Install dependencies
```
npm install
```

### Edit files

1. In `/src/main.js`, put the correct URL of the backend API:
```
axios.defaults.baseURL = 'http://your-domain/public/api/'; 
```

### Run development server

* Compiles and hot-reloads for development
```
npm run serve
```

### Building for Production

* Generate production build
```
npm run build
```
