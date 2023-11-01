(ns simpleui.app
	(:require
		[promesa.core :as p]))

(def Router (aget (js/require "itty-router") "Router"))
(def router (Router.))

(.post router "/"
			(fn [req]
				(p/let [body (.text req)]
					(js/Response. body))))

(def ^:export fetch (.-handle router))
