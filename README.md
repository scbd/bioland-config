bioland-config

git clone https://github.com/scbd/bioland-public.git
mv bioland-public prod
cd prod
yarn
yarn blc init
ddev start
ddev composer i



git pull
ddev composer up



site: killCache: true, 