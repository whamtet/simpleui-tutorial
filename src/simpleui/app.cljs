(ns simpleui.app
	(:require
		[promesa.core :as p]
		[sci.core :as sci]
		[simpleui.adapter :refer [->req]]))

(defn pr-str2 [x]
	(if (string? x)
		x
		(pr-str x)))

(defn ^:export handler [req]
	(p/let [req req #_(->req req)]
		(-> req .-url js/Response.)))
