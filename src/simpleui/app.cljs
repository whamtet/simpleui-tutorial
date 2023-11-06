(ns simpleui.app
	(:require
		[promesa.core :as p]
		[sci.core :as sci]))

(defn pr-str2 [x]
	(if (string? x)
		x
		(pr-str x)))

(defn ^:export handler [req]
	(p/let [body (.text req)]
		(-> body sci/eval-string pr-str2 js/Response.)))
