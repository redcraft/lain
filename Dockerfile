FROM ubuntu

RUN apt-get update && apt-get install -y \
	nodejs \
	npm \
&& rm -rf /var/lib/apt/lists/*

COPY ./ /opt/app/

WORKDIR /opt/app/

RUN npm install

ARG IMG_VERSION
ENV IMG_VERSION ${IMG_VERSION:-v1.0.0}

LABEL author="Maxim Gurkin" \
      location="Singapore" \
      build_version=$IMG_VERSION

EXPOSE 3000

#CMD ["nodejs", "app.js"]
CMD nodejs app.js
