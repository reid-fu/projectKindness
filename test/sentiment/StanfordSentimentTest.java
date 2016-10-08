package sentiment;
import java.util.Properties;
import edu.stanford.nlp.ling.CoreAnnotations.SentencesAnnotation;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations.*;
import edu.stanford.nlp.util.CoreMap;

public class StanfordSentimentTest {
	public static void main(String[] args) {
		Properties props = new Properties();
	    props.put("annotators", "tokenize,ssplit,pos,parse,sentiment");
	    StanfordCoreNLP pipeline = new StanfordCoreNLP(props);
	    String sentence = "You're an asshole.";
	    Annotation document = new Annotation(sentence);
	    pipeline.annotate(document);
	    CoreMap sentenceAnns = document.get(SentencesAnnotation.class).get(0);
	    System.out.println(sentenceAnns.get(SentimentClass.class));
	}
}
