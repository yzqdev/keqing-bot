import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  // entries: ["src/"],
  failOnWarn:false,
  rollup: {
    emitCJS: false,
    inlineDependencies: false,
     alias:{
       entries: [
         {
           find: /^@/g,
           replacement: "./src/"
         }
       ]
     }
  },
  clean: true,
  declaration: true,
});
