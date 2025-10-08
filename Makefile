.PHONY: build run stop clean

build:
	docker build -t showcase-nexus-ai-pay-dashboard .

run:
	docker run -d -p 8080:80 --name showcase-container showcase-nexus-ai-pay-dashboard

stop:
	docker stop showcase-container
	docker rm showcase-container

clean:
	docker rmi showcase-nexus-ai-pay-dashboard