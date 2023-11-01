(ns simpleui.main
		(:require
			[cljs.build.api :as b]
			[clojure.java.shell :refer [sh]]))

(defn -main [& [arg]]
	(let [watch? (= "-w" arg)]
  	((if watch? b/watch b/build)
	  	"src"
		  {:closure-output-charset "us-ascii"
  		 :optimizations :advanced
	  	 :output-to "cljs/main.js"
		   :output-dir "cljs"
  		 :browser-repl false
	  	 :main 'simpleui.app
			 :externs ["src/externs.js"]
			 :output-wrapper "%s\n\nexport default {\nfetch: simpleui.app.fetch\n};"
  		 :watch-fn #(prn (sh "tput" "bel"))})))
