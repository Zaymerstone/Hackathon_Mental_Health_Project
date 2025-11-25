import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./shared/hooks/redux.js";
import { checkUser } from "./entities/user/models/user.slice.js";

export default function TestRedux() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Redux Test Component</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
