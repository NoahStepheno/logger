import Koa from "koa";
import dayjs from "dayjs";
import qs from "node:querystring";
import { merge, pick } from "lodash";
import { writeLogger, WritePayload, WRITE_KEYS } from "./service";

const app = new Koa();

app.use((ctx) => {
  const search = ctx.request.URL.search?.split("?")?.[1];
  const parsed = qs.parse(search);
  const picked = merge(pick(parsed, WRITE_KEYS), {
    date: dayjs().format("HH-mm-ss"),
  }) as WritePayload;
  writeLogger(picked);
  ctx.status = 200;
});

app.listen(3000);
