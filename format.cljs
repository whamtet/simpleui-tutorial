(ns format
	(:require
		[clojure.string :as string]
		["fs" :as fs]
		["highlight.js/lib/common$default" :as hljs]))

(def slurp-lines #(-> % fs/readFileSync str .trim (.split "\n")))
(defn spit-lines [f s]
	(->> s (string/join "\n") (fs/writeFileSync f)))

(def get-code #(second (re-find #"<code[^>]*>([^<]+)" %)))

(defn format-code [line]
	(if-let [code (get-code line)]
		(->> code hljs/highlightAuto .-value (.replace line code))
		line))

(->> "index.template.html"
		 slurp-lines
		 (map format-code)
		 (spit-lines "frontend/index.html"))
