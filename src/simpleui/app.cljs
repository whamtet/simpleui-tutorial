(ns simpleui.app)

(def Router (aget (js/require "itty-router") "Router"))
(def router (Router.))

(.get router "/" #(js/Response. "hia"))

(def ^:export fetch (aget router "handle"))
