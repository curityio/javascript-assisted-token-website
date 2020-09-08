# JavaScript Assisted Token Example

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

This example shows how the assisted token flow can be used with a JavaScript client. One part of the example uses JQuery to call an API, but that library is only needed for that part, and isn't a requirement of the assisted token flow or the client library.

> *NOTE*: A very similar version of this example used to ship with the Curity Identity Server.

## Setup

This sample is easiest to run after executing the basic setup wizard. It assumes that URIs for various endpoints use the ones created by that wizard. If this doesn't match your setup, some parts of the HTML and JavaScript in `index.html` will requires changes. 

The client that is used in the example is called `client-assisted-example`. This can be imported by running the [sample configuration](https://developer.curity.io/release/5.0.0/configuration-samples) that accompanies each release of the Curity Identity Serve, and can be found in the developer portal. If this configuration isn't used, the following client (or one very similar to it) should be defined:

```xml
<config xmlns="http://tail-f.com/ns/config/1.0">
  <profiles xmlns="https://curity.se/ns/conf/base">
  <profile>
  	<!-- This is the profile ID created by the basic setup wizard, but may require changes in your setup. -->
    <id>token-service</id>
    <type xmlns:as="https://curity.se/ns/conf/profile/oauth">as:oauth-service</type>
      <settings>
      <authorization-server xmlns="https://curity.se/ns/conf/profile/oauth">
      <client-store>
      <config-backed>
      <client>
        <id>client-assisted-example</id>
        <!-- Will require changes if different host or port is used -->
        <allowed-origins>http://localhost:8080</allowed-origins>
        <capabilities>
          <assisted-token/>
        </capabilities>
      </client>
      </config-backed>
      </client-store>
      </authorization-server>
      </settings>
  </profile>
  </profiles>
</config>
```

The important parts of this configuration are:

* The client ID needs to match the one in the JavaScript in `index.html` at line 76.
* The client and profile have to have the assisted token flow enabled.
* The allowed origin should match the one used to host `index.html` (the JavaScript client). For testing, `*` can be used, but is _not_ recommended.

## Serving the Sample

The sample is a static HTML page. This makes it very easy to host anywhere. For instance, it can be hosted with this one line command:

```bash
$ npx http-server
```

This will work for most of the use cases covered by the example, but not all. To make all of them work, the `server.js` file should be used with Node.js like this:

```bash
$ node server.js
```

This will ensure that the example demonstrating how to call an API works. Also, the second example showing SSO requires this.

Once the static HTML is served, by hook or by crook, download it into a browser and try it out. 

## More Information

More information about the assisted token flow and other related samples can be found at these locations:

* [Angular example](https://github.com/curityio/angular-assisted-token-website)
* [React example](https://github.com/curityio/react-assisted-token-website)
* Assisted token flow [blog post and presentation](https://nordicapis.com/assisted-token-flow-the-answer-to-oauth-integration-in-single-page-applications/) on Nordic APIs
* Assisted token draft [protocol specification](https://datatracker.ietf.org/doc/draft-ideskog-assisted-token/)
* [Other developer resources and example](https://developer.curity.io/) on the Curity.io Web site

## Licensing

This software is copyright (C) 2020 Curity AB. It is open source software that is licensed under the [Apache 2 license](LICENSE).
