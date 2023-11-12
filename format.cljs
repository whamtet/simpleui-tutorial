(ns format
	(:require
		[clojure.string :as string]
		["fs" :as fs]
		["highlight.js/lib/common$default" :as hljs]))

(def slurp #(-> % fs/readFileSync str))
(def spit fs/writeFileSync)

(defn format [fmt-str & args]
	(reduce
	 #(.replace %1 "%s" (str %2)) fmt-str args))

(defn map-rest [f [x & items]]
	(cons x (map f items)))

(defn format-head [chunk]
	(let [[code] (.split chunk "</code>")]
		(->> code hljs/highlightAuto .-value (.replace chunk code))))

(defmacro defsnippet [sym]
	`(def ~sym (slurp ~(format "src/snippets/%s.html" sym))))

(defsnippet header)

(def local-endpoint "http://localhost:8787")
(def remote-endpoint "https://simpleui.simpleui.workers.dev")

(defn -main
	[& [watch?]]
	(let [chunks (.split (slurp "index.template.html") "/*hl*/ ")
				highlighted (->> chunks (map-rest format-head) string/join)]
		(spit
		 "frontend/index.html"
		 (cond-> highlighted
						 true (.replaceAll "<!-- header -->" header)
						 (not watch?) (.replaceAll local-endpoint remote-endpoint)))))
