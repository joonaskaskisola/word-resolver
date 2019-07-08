# Starting

#### Client
```bash
cd client
yarn install
yarn start
```

#### PHP Server
```bash
cd server/php
cp ../../kotus-sanalista/kotus-sanalista_v1.xml ./kotus-sanalista_v1.xml
php -S 0.0.0.0:3001 index.php
```

#### NodeJS Server
```bash
cd server/node
cp ../../kotus-sanalista/kotus-sanalista_v1.xml ./kotus-sanalista_v1.xml
yarn start
```

Visit `http://localhost:3000/`
