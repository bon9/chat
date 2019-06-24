import { useState, useEffect } from "react";
import { db } from "./firebase";

// создаем кеш для каждого юзера, чтобы каждый раз не запрашивать с сервера
const cache = {};
const pendingCache = {};

export default function useDoc(path) {
  const [doc, setDoc] = useState(cache[path]);
  useEffect(() => {
    if (doc) {
      return;
    }

    let stillMounted = true;
    const pending = pendingCache[path];
    const promise =
      pending ||
      (pendingCache[path] = db
        .doc(path)
        //get вместо onSnapshot, чтобы не получать данные после каждого сообщения
        .get());

    promise.then(doc => {
      if (stillMounted) {
        const user = {
          ...doc.data(),
          id: doc.id
        };
        setDoc(user);
        cache[path] = user;
      }
    });

    return () => {
      stillMounted = false;
    };
  }, [doc, path]);

  return doc;
}
