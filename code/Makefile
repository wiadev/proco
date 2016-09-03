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

firebasedeploy: prebuildwebapps buildwebapps postbuildwebapps firebasebolt
	cd ./firebase && npm run deploy

firebasebolt:
	rm -rf ./firebase/rules.json && rm -rf ./firebase/rules.bolt
	cd ./firebase && cat ./rules/**.bolt > rules.bolt
	cd ./firebase && npm run bolt
	rm -rf ./firebase/rules.bolt

synccommon:
	rm -rf ./mobile/src/core/common
	cp -R ./common/src ./mobile/src/core/common