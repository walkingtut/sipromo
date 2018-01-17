# Sistem Informasi Project Management Office (SIPROMO)

Sistem Informasi Project Management Office atau SIPROMO merupakan sistem informasi untuk melakukan pencatatan, pengelolaan, dan penentuan resiko terhadap paket kegiatan-paket kegiatan yang ada di Direktorat Jenderal Bina K

## Persiapan

Untuk mempersiapkan aplikasi ini, persiapkan Node di sistem dimana aplikasi ini akan diimplementasikan. Untuk melakukan instalasi Node, install terlebih dahulu NVM dari https://github.com/creationix/nvm. Install script instalasi NVM terlebih dahulu menggunakan Curl:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```
atau menggunakan wget:

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```
Selanjutnya, masukan $NVM_HOME ke dalam ~/.bashrc atau ~/.bash_profile atau ~/.profile:

```
         v8.2.1
         v8.3.0
         v8.4.0
         v8.5.0
         v8.6.0
         v8.7.0
         v8.8.0
         v8.8.1
         v8.9.0   (LTS: Carbon)
         v8.9.1   (LTS: Carbon)
         v8.9.2   (LTS: Carbon)
         v8.9.3   (LTS: Carbon)
         v8.9.4   (Latest LTS: Carbon)
         v9.0.0
         v9.1.0
         v9.2.0
         v9.2.1
         v9.3.0
         v9.4.0
```         

If you do not have credentials, you can get them by [signing up for a trial of ExtReact](https://www.sencha.com/products/extreact/evaluate/).

Then, run the following to build and launch the app:

```
git clone https://github.com/sencha/extjs-reactor.git
cd packages/reactor-kitchensink
npm install
npm start
```

You can view the app by pointing your browser to [http://localhost:8084](http://localhost:8084)

# Running against a local copy of the SDK repo

1. `git clone git@github.com:sencha/extjs-reactor.git`
2. `npm install`
3. `cd packages/reactor-kitchensink`
4. `ln -s /path/to/ExtJS ext` - or, for Windows: `mklink ext /path/to/ExtJS` 
5. `npm run local`
