import { generateTopic } from "./chatgpt";

const generateTextAction =  {
      name: "generateContentAction",
      label: "Generate Content",
      inputFields: [
        {
            type: "string",
            name: "topic",
            label: "Topic",
            required: true,
        },
        {
            type: "number",
            name: "sentenceCount",
            label: "Sentence Count",
            required: true,
        }
      ],
      run: async options => {
        const logger = options.getLogger();

        const newValue = await generateTopic(options?.inputData?.topic, options?.inputData?.sentenceCount, options?.currentLocale)
        logger.debug(`Setting content to: ${newValue}`);

        options.contentSourceActions.updateDocument({
          document: options.parentDocument,
          userContext: options.getUserContextForContentSourceType(
            options.parentDocument.srcType
          ),
          operations: [
              {
                opType: "set",
                fieldPath: options.fieldPath.filter(key => key != options.currentLocale),
                modelField: options.modelField,
                field: { type: "string", value: newValue },
                locale: options.currentLocale,
              }
            ]
        });

        logger.debug("Finished generate action");
      }
}

export { generateTextAction }