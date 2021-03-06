import * as React from 'react';
import PropTypes from 'prop-types';
import * as ResourceTypes from '../resource-types';
import { Link } from 'react-router-dom';

interface Props {
    book: ResourceTypes.Book;
    link: string;
    className?: string;
}

export class BookView extends React.Component<Props> {
    render() {
        const book = this.props.book;
        let bookName;

        if (book.name != '') {
            const width = screen.width <= 750 ? 12 : 14;
            if (book.name.charAt(width + 1) != '') {
                bookName = (
                    <pre className="book-view-pre">
                        {book.name.slice(0, width)}
                        <br />
                        {book.name.slice(width)}
                    </pre>
                );
            } else {
                bookName = (
                    <pre className="book-view-pre">
                        {book.name.slice(0, width)}
                        <br />
                        <br />
                    </pre>
                );
            }
        } else {
            bookName = (
                <pre className="book-view-pre">
                    <br />
                    <br />
                </pre>
            );
        }

        return (
            <div className={this.props.className || 'book-view-box'}>
                <Link to={this.props.link ? this.props.link : '#'}>
                    <img src={book.cover} className="book-view-img" alt={book.name} />
                    {bookName}
                </Link>
            </div>
        );
    }
}

