(ns simpleui.app
	(:require
		[promesa.core :as p]
		[sci.core :as sci]))

(def Router (aget (js/require "itty-router") "Router"))
(def router (Router.))

(defn pr-str2 [x]
	(if (string? x)
		x
		(pr-str x)))

(.post router "/"
			(fn [req]
				(p/let [body (.text req)]
					(-> body sci/eval-string pr-str2 js/Response.))))

(def ^:export fetch (.-handle router))
