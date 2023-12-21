import * as shell from "shelljs";

shell.cp( "-R", "src/site/views", "dist/src/site/" );
shell.cp( "-R", "src/site/public", "dist/src/site/" );