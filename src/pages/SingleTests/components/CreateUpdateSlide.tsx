import React, {useState} from 'react'
import {Drawer, Form, Input,Button, message} from 'antd'
import { TableListItem } from '../data.d';
import { saveOrUpdateSingleTest } from '../service';


export interface FormValueType extends Partial<TableListItem> {
  testNo?: string,
  subject?: string,
  testFrom?: string,
  testYear?: string,
  question?: string,
  answerA?: string,
  answerB?: string,
  answerC?: string,
  answerD?: string,
  answer?: string,
}

export interface CreateUpdateSlideProps {
  visible: boolean;
  onClose: (update:boolean) => void;
  record: Partial<TableListItem>;
}

export interface CreateUpdateSlideState {
  formVals: FormValueType;
}





const FormItem = Form.Item;
const { TextArea } = Input;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateUpdateSlide: React.FC<CreateUpdateSlideProps> = (props) => {
  
  const [formVals] = useState<FormValueType>({
    testNo: props.record.testNo,
    subject: props.record.subject,
    testFrom:  props.record.testFrom,
    testYear: props.record.testYear,
    question: props.record.question,
    answerA: props.record.answerA,
    answerB: props.record.answerB,
    answerC: props.record.answerC,
    answerD: props.record.answerD,
    answer: props.record.answer,
  });
  const {
    visible,
    onClose,
  } = props;
  const [form] = Form.useForm();

  const onCanle = () => onClose(false)

  const onConfrim = async () => {
    // onClose()
    const fieldsValue = await form.validateFields();
    const saveData = {
      ...props.record,
      ...fieldsValue,
    }
    try {
      const res = await saveOrUpdateSingleTest(saveData)
      if (res) {
        onClose(true)
      }
    } catch (err) {
      message.error(err);
    }

  }

  const renderContent = () => {
    return (
      <>
        <FormItem name="testNo" label="试题编号">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="testYear" label="试题年份">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="subject" label="科目">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="testFrom" label="试题出处">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="question" label="题目">
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answerA" label="A">
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answerB" label="B">
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answerC" label="C">
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answerD" label="D">
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answer" label="答案">
          <Input  placeholder="请输入A,B,C,D" />
        </FormItem>
      </>
    )
  }


  const renderFooter = () => {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Button onClick={onCanle} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={onConfrim} type="primary">
          确定
        </Button>
      </div>
    )
  }

  return (
    <Drawer
        title="编辑题目"
        placement="right"
        width="600"
        closable={false}
        onClose={() => {onClose(false)}}
        visible={visible}
        footer={renderFooter()}
      >
        <Form
          {...formLayout}
          form={form}
          initialValues={{
            testNo: formVals.testNo,
            subject: formVals.subject,
            testYear: formVals.testYear,
            testFrom: formVals.testFrom,
            question: formVals.question,
            answerA: formVals.answerA,
            answerB: formVals.answerB,
            answerC: formVals.answerC,
            answerD: formVals.answerD,
            answer: formVals.answer
          }}
      >
        {renderContent()}
      </Form>
      </Drawer>
  )
}

export default CreateUpdateSlide;