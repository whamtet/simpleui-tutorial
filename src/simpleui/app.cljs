(ns simpleui.app
	(:require
		ctmx.core
		ctmx.render
		ctmx.rt
		[promesa.core :as p]
		reitit.ring
		[sci.core :as sci]
		[simpleui.adapter :refer [->req <-req]]))

(defn format [fmt-str & args]
	(reduce
		#(.replace %1 "%s" %2) fmt-str args))

(def src-wrap
	"(require '[ctmx.core :refer [defcomponent]])
	 (require '[reitit.ring :as r])

	%s

	(defn endpoint-syms []
  (for [[k v] (ns-interns 'user)
        :when (-> v meta :endpoint)]
    k))

  (defmacro reitit []
    (vec
      (for [f (endpoint-syms)]
        [(str \"/\" f) `(fn [x#] (-> x# ~f ctmx.render/snippet-response))])))

((-> (reitit) r/router r/ring-handler) request)")

(defn interpret [{:keys [params] :as req}]
	(let [{:keys [code tests]} params
				req (assoc req :params (dissoc params :code :tests))
				user {'request (sci/new-var 'request req)}
				ctmx-core (sci/copy-ns ctmx.core (sci/create-ns 'ctmx.core))
				ctmx-rt (sci/copy-ns ctmx.rt (sci/create-ns 'ctmx.rt))
				ctmx-render (sci/copy-ns ctmx.render (sci/create-ns 'ctmx.render))
				reitit-ring (sci/copy-ns reitit.ring (sci/create-ns 'reitit.ring))
				ctx (sci/init {:namespaces {'user user
																		'ctmx.core ctmx-core
																		'ctmx.rt ctmx-rt
																		'ctmx.render ctmx-render
																		'reitit.ring reitit-ring}})]
		(->> code
				 (format src-wrap)
				 (sci/eval-string* ctx))))

(defn u []
	(let [ctx (sci/init {:namespaces {}})]
		(sci/eval-string* ctx "(vec (for [i [1 2 3]] i))")))

#_
(try (prn (interpret
					 {:request-method :get
						:uri "/my-component"
						:params {:code "(defcomponent ^:endpoint my-component [req] [:div \"hi\"])"}}))
	(catch :default e
		(js/console.log e)))

(defn ^:export handler [req]
	(p/let [req (->req req)]
		(try
			(-> req interpret <-req)
			(catch :default e
				(-> e str js/Response.)))))
