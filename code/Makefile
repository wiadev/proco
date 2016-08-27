prebuildwebapps:
	rm -rf ./firebase/public
	mkdir ./firebase/public
	mkdir ./firebase/public/apps

buildwebapps: 
	cd ./site && npm run build
	cd ./dashboard && npm run build

postbuildwebapps:
	cp -R ./site/build ./firebase/public/apps/site
	cp -R ./dashboard/build ./firebase/public/apps/dashboard

firebasedeploy: prebuildwebapps buildwebapps postbuildwebapps
	cd ./firebase && npm run deploy

synccommon:
	rm -rf ./mobile/src/core/common
	cp -R ./common/src ./mobile/src/core/common