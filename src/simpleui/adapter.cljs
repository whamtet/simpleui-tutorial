(ns simpleui.adapter
	(:require
		[promesa.core :as p]))

(defn get-body [req]
	(p/let [body (.text req)
					entries (-> body js/URLSearchParams. .entries)]
		(->> #(.-value (.next entries))
				 repeatedly
				 (take-while identity)
				 (map (fn [[k v]]
								[(keyword k) v]))
				 (into {}))))

(defn ->req [req]
	(p/let [body (get-body req)]
		{:params body
		 :uri (-> req .-url js/URL. .-pathname)
		 :request-method (-> req .-method .toLowerCase keyword)}))

(defn <-req [{:keys [body status headers]}]
	(->> {:status status
				:headers headers}
			 clj->js
			 (js/Response. body)))
