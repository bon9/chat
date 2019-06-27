import { useState, useEffect } from "react";
import { db } from "./firebase";

export default function useCollection(path, orderBy, where = []) {
  //orderBy поле сортировки
  const [docs, setDocs] = useState([]);

  const [queryField, queryOperator, queryValue] = where;
  useEffect(() => {
    //You can listen to a document with the onSnapshot() method. An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot.
    let collection = db.collection(path);
    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }
    if (queryField) {
      // выбираем только тех, у кого текущий чат true
      collection = collection.where(queryField, queryOperator, queryValue);
    }
    return collection.onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setDocs(docs);
    });
  }, [path, orderBy, queryField, queryOperator, queryValue]);
  return docs;
}
