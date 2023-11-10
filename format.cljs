(ns format
	(:require
		[clojure.string :as string]
		["fs" :as fs]
		["highlight.js/lib/common$default" :as hljs]))

(def slurp #(-> % fs/readFileSync str))
(def spit fs/writeFileSync)

(defn map-rest [f [x & items]]
	(cons x (map f items)))

(defn format-head [chunk]
	(let [[code] (.split chunk "</code>")]
		(->> code hljs/highlightAuto .-value (.replace chunk code))))

(->> (.split (slurp "index.template.html") "/*hl*/ ")
		 (map-rest format-head)
		 string/join
		 (spit "frontend/index.html"))
